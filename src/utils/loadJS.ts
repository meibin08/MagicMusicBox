
const loadJS = (src: string, callback: Function ) => {
  interface scriptProps {
      onload: any;
      onreadystatechange?:any;
      src: string;
      readyState?: any;
  };
  let script:scriptProps = document.createElement('script');
  let head:HTMLElement = document.getElementsByTagName('head')[0];
  let loaded: boolean =false;

  script.src = src;

  if(typeof callback === 'function'){
    script.onload = script.onreadystatechange = function(){
      if(!loaded && (!script.readyState || /loaded|complete/.test(script.readyState))){
        script.onload = script.onreadystatechange = null;
        loaded = true;
        callback();
      }
    }
  }
  
  head.appendChild(script as HTMLScriptElement);
}

export default loadJS;