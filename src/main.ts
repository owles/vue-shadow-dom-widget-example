import './assets/main.scss'

import { createApp } from 'vue'
import App from './App.vue'
import {createShadowElement} from "@/widget/widget";

createApp(App).mount(
    createShadowElement('widget-app')
)
