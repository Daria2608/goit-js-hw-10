import"./assets/modulepreload-polyfill-3cfb730f.js";import{i as s}from"./assets/vendor-77e16229.js";document.querySelector("button");const t=document.querySelector("form");t.addEventListener("submit",i=>{i.preventDefault();const o=Number(t.delay.value),n=t.querySelector('input[name="state"]:checked').value;new Promise((e,r)=>{setTimeout(()=>{n==="fulfilled"?e(o):r(o)},o)}).then(function(e){s.success({message:`✅ Fulfilled promise in ${e}ms`,fontSize:"large",close:!0,position:"topRight",messageColor:"white",timeout:2e3,icon:!1})}).catch(function(e){s.error({message:`❌ Rejected promise in ${e}ms`,fontSize:"large",close:!0,position:"topRight",messageColor:"white",timeout:2e3,icon:!1})}),t.reset()});
//# sourceMappingURL=commonHelpers2.js.map