# Vue ShadowDom widget example

This is example provide how to you may to create widget with vueJS inside shadow dom with styles inside compiled JS.

``` 
nmp i
npm run build (use for instead "npm run dev")
```

Use this func for inject widget

``` 
<!-- This is inject function -->
<script>
   (function(){
      const s = document.createElement('script');
      s.type = 'module'
      s.src = '/dist/assets/app.js'
      document.head.appendChild(s);
   }());
</script>
```
