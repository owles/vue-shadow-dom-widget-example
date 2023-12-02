import { defineComponent, h } from 'vue'
import type {ResolvedConfig} from "vite";

/**
 * Make shadow DOM app root element for mount
 *
 * @param appName
 * @returns {HTMLDivElement}
 */
export const createShadowElement = (appName: string): HTMLDivElement => {
    const appRoot: HTMLElement = document.createElement(appName)
    const appMount: HTMLDivElement = document.createElement('div')

    appRoot.attachShadow({ mode: 'open' }).appendChild(appMount)
    appRoot.setAttribute('id', appName)

    appMount.setAttribute('class', 'application')

    document.body.appendChild(appRoot)

    return appMount
}

/**
 * Make style in the shadow DOM element
 */
export const ShadowStyle = defineComponent({
    setup (props, { slots }) {
        return {}
    },
    render () {
        return h(
            'style',
            '/* injected-css */'
        )
    }
})

/**
 * Vite plugin for extract built SCC and put it in the style component
 */
export const styleInjectPlugin = () => {
    // eslint-disable-next-line no-unused-vars
    let config

    return {
        enforce: 'post',
        name: 'shadow-style-gen',
        // config (config, env) {},
        configResolved (_config: ResolvedConfig): void | Promise<void> {
            config = _config
        },
        // eslint-disable-next-line require-await
        async generateBundle (opts: any, bundle: any) {
            let cssData:string = ''
            const cssAssets = Object.keys(bundle).filter(
                (i) =>
                    bundle[i].type === 'asset' &&
                    bundle[i].fileName.endsWith('.css')
            )

            cssAssets.forEach(name => {
                if (bundle[name].source !== undefined) {
                    cssData += bundle[name].source
                }
            })

            const appBundle = Object.keys(bundle).filter(
                (i) =>
                    bundle[i].name === 'app' &&
                    bundle[i].fileName.endsWith('.js')
            )

            appBundle.forEach(name => {
                cssData = cssData.replaceAll('"', '\\"')
                cssData = cssData.replaceAll('\n', '')
                bundle[name].code = bundle[name].code.replace('/* injected-css */', cssData)
            })
        }
    }
}
