import{_ as J,u as O,a as W}from"./index-CGrgovxm.js";import{_ as X,a as Y}from"./queryItem.vue_vue_type_style_index_0_scope_true_lang-DZYHg8pM.js";import{a as Z,d as ee,e as oe}from"./dict-CNGvzHPQ.js";import te from"./details-CVnu5sV7.js";import{d as b,a as v,h as ne,j as ie,l as ae,ad as le,by as a,q as t,u as e,f as y}from"./@vue-CRj7PaMA.js";import{j as de,T as re,L as se,M as me,G as pe,H as ue}from"./naive-ui-ItunR-2b.js";import"./index-DQwUUgFs.js";import"./@vueuse-Bot-wEr0.js";import"./pinia-B-btkknc.js";import"./vue-demi-Dq6ymT-8.js";import"./vue-i18n-BZ7cv-U7.js";import"./@intlify-Y34EtYYP.js";import"./vue-echarts-C0IzmTCj.js";import"./resize-detector-G6vbKCU7.js";import"./echarts-BhkYWNed.js";import"./zrender-DGIA2jg-.js";import"./tslib-BDyQ-Jie.js";import"./vue-router-DYGa2EEA.js";import"./@iconify-D4xAYz74.js";import"./axios-B4uVmeYG.js";import"./@codemirror-uT1p_ncg.js";import"./@lezer-COsil1JX.js";import"./crelt-C8TCjufn.js";import"./style-mod-Bc2inJdb.js";import"./w3c-keyname-Vcq4gwWv.js";import"./lodash-es-q_UuXcXk.js";import"./pinia-plugin-persistedstate-RV7uh3T-.js";import"./vite-plugin-mock-CVu1TUMM.js";import"./mockjs-SqilSaKE.js";import"./@babel-dN-1QE0A.js";import"./path-to-regexp-D27XTR3m.js";import"./date-fns-BAYWyKT4.js";import"./vueuc-DHpchg3q.js";import"./evtd-CI_DDEu_.js";import"./seemly-pQYQdLy2.js";import"./@css-render-CcHFHqZ8.js";import"./vooks-Vv8Q4iio.js";import"./vdirs-Bxp-63WN.js";import"./@juggle-C8OzoCMD.js";import"./css-render-BDrvWz3H.js";import"./@emotion-WldOFDRm.js";import"./treemate-DKekKYbv.js";import"./async-validator-DKvM95Vc.js";const ce=b({name:"Dict"}),io=b({...ce,setup(_e){const p={add:["admin","dict:add"],del:["admin","dict:del"],edit:["admin","dict:edit"],download:["admin","dict:download"]},r=v([{type:"selection"},{title:"ID",key:"id"},{title:"字典名称",key:"name"},{title:"字典描述",key:"description"},{title:"操作",key:"actions",align:"center",fixed:"right",render(i){return[ne(J,{permission:p,onHandleDelete:()=>u(i.id),onHandleEdit:()=>c(i),onHandleView:()=>F(i)})]}}]),l=v(),h=i=>({style:"cursor: pointer;",onClick:()=>{l.value=i}}),k=ie(()=>i=>{var o;return i.id===((o=l.value)==null?void 0:o.id)?"selected-row":""}),D={name:[{required:!0,message:"请输入字典名称",trigger:"blur"}]},{modalVisible:s,modalAction:R,modalShowFooter:x,modalTitle:U,modalLoading:B,handleAdd:C,handleDelete:u,handleEdit:c,handleDownload:S,handleView:F,handleSave:q,handlereset:A,defualtQuery:_,modalForm:d,modalFormRef:E,changeCheckRow:H,listQuery:K,listData:L,pagination:V,loading:$,rowKey:Q,btnDisabled:j,checkedRowKeys:M}=O({name:"字典",url:"/dict",key:"id",initForm:{name:"",description:"",id:void 0},initQuery:{name:""},doCreate:Z,doDelete:ee,doUpdate:oe,afterRefresh:i=>(l.value=void 0,i)});return(i,o)=>{const m=de,N=X,T=re,z=Y,f=se,G=me,I=W,g=pe,P=ue;return ae(),le(P,{cols:"4","item-responsive":"","y-gap":8,"x-gap":10,responsive:"screen"},{default:a(()=>[t(g,{span:"4 m:2 l:2 xl:2"},{default:a(()=>[t(z,{columns:e(r),"onUpdate:columns":o[1]||(o[1]=n=>y(r)?r.value=n:null),btnDisabled:e(j),permission:p,onSearch:e(K),onReset:e(A),onAdd:e(C),onDelete:e(u),onEdit:e(c),onDownload:e(S)},{queryBar:a(()=>[t(N,{label:"名称"},{default:a(()=>[t(m,{value:e(_).name,"onUpdate:value":o[0]||(o[0]=n=>e(_).name=n),size:"small",placeholder:"输入字典名称或者描述"},null,8,["value"])]),_:1})]),default:a(()=>[t(T,{columns:e(r),data:e(L),pagination:e(V),loading:e($),"row-key":e(Q),"row-props":h,"row-class-name":e(k),striped:"",remote:!0,"checked-row-keys":e(M),"onUpdate:checkedRowKeys":e(H)},null,8,["columns","data","pagination","loading","row-key","row-class-name","checked-row-keys","onUpdate:checkedRowKeys"])]),_:1},8,["columns","btnDisabled","onSearch","onReset","onAdd","onDelete","onEdit","onDownload"]),t(I,{visible:e(s),"onUpdate:visible":o[4]||(o[4]=n=>y(s)?s.value=n:null),title:e(U),loading:e(B),"show-footer":e(x),width:"450px",onSave:e(q)},{default:a(()=>[t(G,{ref_key:"modalFormRef",ref:E,"label-placement":"left","label-align":"right","label-width":80,model:e(d),rules:D,disabled:e(R)==="view"},{default:a(()=>[t(f,{label:"字典名称",path:"name"},{default:a(()=>[t(m,{value:e(d).name,"onUpdate:value":o[2]||(o[2]=n=>e(d).name=n)},null,8,["value"])]),_:1}),t(f,{label:"描述",path:"description"},{default:a(()=>[t(m,{value:e(d).description,"onUpdate:value":o[3]||(o[3]=n=>e(d).description=n)},null,8,["value"])]),_:1})]),_:1},8,["model","disabled"])]),_:1},8,["visible","title","loading","show-footer","onSave"])]),_:1}),t(g,{span:"4 m:2 l:2 xl:2"},{default:a(()=>{var n,w;return[t(te,{pid:(n=e(l))==null?void 0:n.id,name:(w=e(l))==null?void 0:w.name},null,8,["pid","name"])]}),_:1})]),_:1})}}});export{io as default};