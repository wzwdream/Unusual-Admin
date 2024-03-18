import{_ as e,u as a,a as l}from"./index-6bf04137.js";import{_ as o,a as n}from"./queryItem.vue_vue_type_style_index_0_scope_true_lang-001b8ccc.js";import{a as t,d,e as i}from"./dict-76a7f38f.js";import s from"./details-1ad00a2c.js";import{h as r,M as u,x as m,i as p,o as c,j as v,w as h,k as f,l as w,Q as y,S as b,b4 as g,aU as _,aV as k,az as D,ax as x}from"./.pnpm-8a28742c.js";import"./index-6ddaa525.js";const R=r({name:"Dict"}),U=r({...R,setup(r){const R=u([{type:"selection"},{title:"ID",key:"id"},{title:"字典名称",key:"name"},{title:"字典描述",key:"description"},{title:"操作",key:"actions",align:"center",fixed:"right",render:a=>[m(e,{onHandleDelete:()=>C(a.id),onHandleEdit:()=>H(a),onHandleView:()=>I(a)})]}]),U=u(),j=e=>({style:"cursor: pointer;",onClick:()=>{U.value=e}}),S=p((()=>e=>{var a;return e.id===(null==(a=U.value)?void 0:a.id)?"selected-row":""})),F={name:[{required:!0,message:"请输入字典名称",trigger:"blur"}]},{modalVisible:A,modalAction:E,modalShowFooter:K,modalTitle:Q,modalLoading:V,handleAdd:q,handleDelete:C,handleEdit:H,handleDownload:z,handleView:I,handleSave:B,handlereset:L,defualtQuery:M,modalForm:T,modalFormRef:G,changeCheckRow:J,listQuery:N,listData:O,pagination:P,loading:W,rowKey:X,btnDisabled:Y,checkedRowKeys:Z}=a({name:"字典",url:"/dict",key:"id",initForm:{name:"",description:"",id:void 0},initQuery:{name:""},doCreate:t,doDelete:d,doUpdate:i,afterRefresh:e=>(U.value=void 0,e)});return(e,a)=>{const t=b,d=o,i=g,r=n,u=_,m=k,p=l,I=D,$=x;return c(),v($,{cols:"4","item-responsive":"","y-gap":8,"x-gap":10,responsive:"screen"},{default:h((()=>[f(I,{span:"4 m:2 l:2 xl:2"},{default:h((()=>[f(r,{columns:w(R),"onUpdate:columns":a[1]||(a[1]=e=>y(R)?R.value=e:null),btnDisabled:w(Y),onSearch:w(N),onReset:w(L),onAdd:w(q),onDelete:w(C),onEdit:w(H),onDownload:w(z)},{queryBar:h((()=>[f(d,{label:"名称"},{default:h((()=>[f(t,{value:w(M).name,"onUpdate:value":a[0]||(a[0]=e=>w(M).name=e),size:"small",placeholder:"输入字典名称或者描述"},null,8,["value"])])),_:1})])),default:h((()=>[f(i,{columns:w(R),data:w(O),pagination:w(P),loading:w(W),"row-key":w(X),"row-props":j,"row-class-name":w(S),striped:"",remote:!0,"checked-row-keys":w(Z),"onUpdate:checkedRowKeys":w(J)},null,8,["columns","data","pagination","loading","row-key","row-class-name","checked-row-keys","onUpdate:checkedRowKeys"])])),_:1},8,["columns","btnDisabled","onSearch","onReset","onAdd","onDelete","onEdit","onDownload"]),f(p,{visible:w(A),"onUpdate:visible":a[4]||(a[4]=e=>y(A)?A.value=e:null),title:w(Q),loading:w(V),"show-footer":w(K),width:"450px",onSave:w(B)},{default:h((()=>[f(m,{ref_key:"modalFormRef",ref:G,"label-placement":"left","label-align":"right","label-width":80,model:w(T),rules:F,disabled:"view"===w(E)},{default:h((()=>[f(u,{label:"字典名称",path:"name"},{default:h((()=>[f(t,{value:w(T).name,"onUpdate:value":a[2]||(a[2]=e=>w(T).name=e)},null,8,["value"])])),_:1}),f(u,{label:"描述",path:"description"},{default:h((()=>[f(t,{value:w(T).description,"onUpdate:value":a[3]||(a[3]=e=>w(T).description=e)},null,8,["value"])])),_:1})])),_:1},8,["model","disabled"])])),_:1},8,["visible","title","loading","show-footer","onSave"])])),_:1}),f(I,{span:"4 m:2 l:2 xl:2"},{default:h((()=>{var e,a;return[f(s,{pid:null==(e=w(U))?void 0:e.id,name:null==(a=w(U))?void 0:a.name},null,8,["pid","name"])]})),_:1})])),_:1})}}});export{U as default};
