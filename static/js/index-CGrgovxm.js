import{d as x,j as h,l as S,ad as $,ak as we,by as g,af as ge,aZ as G,q as H,B as D,u as he,f as ye,P as ke,a$ as _e,bb as L,ae as U,L as W,v as V,a as w}from"./@vue-CRj7PaMA.js";import{B as Y,i as Ce,n as be}from"./naive-ui-ItunR-2b.js";import{h as ee,s as j,t as q,v as X,w as Se}from"./index-DQwUUgFs.js";import{u as te}from"./vue-i18n-BZ7cv-U7.js";import{c as A}from"./lodash-es-q_UuXcXk.js";const $e={flex:"","justify-end":""},De=x({name:"BaseModel"}),Ie=x({...De,props:{width:{default:"600px"},title:{default:""},showFooter:{type:Boolean,default:!0},visible:{type:Boolean,default:!1},loading:{type:Boolean,default:!1}},emits:["update:visible","save"],setup(s,{emit:l}){const d=s,n=l,t=h({get(){return d.visible},set(o){n("update:visible",o)}});return(o,u)=>{const y=Y,r=Ce;return S(),$(r,{show:he(t),"onUpdate:show":u[2]||(u[2]=m=>ye(t)?t.value=m:null),style:ke({width:o.width}),preset:"card",title:o.title,size:"huge",bordered:!1},we({default:g(()=>[G(o.$slots,"default")]),_:2},[o.showFooter?{name:"footer",fn:g(()=>[ge("footer",$e,[G(o.$slots,"footer",{},()=>[H(y,{onClick:u[0]||(u[0]=m=>t.value=!1)},{default:g(()=>[D("取消")]),_:1}),H(y,{loading:o.loading,"ml-20":"",type:"primary",onClick:u[1]||(u[1]=m=>n("save"))},{default:g(()=>[D("保存")]),_:1},8,["loading"])])])]),key:"0"}:void 0]),1032,["show","style","title"])}}}),ze=x({name:"TableAction"}),Ke=x({...ze,props:{optShow:{default:()=>({view:!0,edit:!0,del:!0})},disabled:{type:Boolean,default:!1},permission:{default:()=>({edit:[],del:[]})}},emits:["handleView","handleEdit","handleDelete"],setup(s,{emit:l}){const d=s,n=l;return(t,o)=>{const u=Y,y=be,r=_e("permission");return S(),$(y,{justify:"center"},{default:g(()=>[d.optShow.view?(S(),$(u,{key:0,type:"info",text:"",size:"small",onClick:o[0]||(o[0]=m=>n("handleView"))},{default:g(()=>[D(L(t.$t("view")),1)]),_:1})):U("",!0),d.optShow.edit?W((S(),$(u,{key:1,disabled:t.disabled,type:"warning",text:"",size:"small",onClick:o[1]||(o[1]=m=>n("handleEdit"))},{default:g(()=>[D(L(t.$t("edit")),1)]),_:1},8,["disabled"])),[[r,t.permission.edit]]):U("",!0),d.optShow.del?W((S(),$(u,{key:2,disabled:t.disabled,type:"error",text:"",size:"small",onClick:o[2]||(o[2]=m=>n("handleDelete"))},{default:g(()=>[D(L(t.$t("delete")),1)]),_:1},8,["disabled"])),[[r,t.permission.del]]):U("",!0)]),_:1})}}}),Be=(s,l)=>ee.get(s,l),Pe=s=>{const{t:l}=te(),d=h(()=>({total:l("total"),tiao:l("tiao")})),n=V({page:1,pageSize:10,itemCount:0,showSizePicker:!0,showQuickJumper:!0,pageSizes:[10,20,30,40,50,100],prefix:({itemCount:t})=>`${d.value.total} ${t} ${d.value.tiao}`,onUpdatePage:t=>{n.page=t,s()},onUpdatePageSize:t=>{n.page=1,n.pageSize=t,s()}});return{pagination:n}},Te=(s,l)=>ee.post(s,l,{responseType:"blob"}),Ne=()=>{const s=w([]),l=w([]);return{checkedRowKeys:s,changeCheckRow:(n,t)=>{s.value=n,l.value=A(t)},checkedRow:l}},Le=({name:s,url:l,key:d="id",isPagination:n=!0,isInitQuery:t=!0,initForm:o={},initQuery:u={},doCreate:y,doDelete:r,doUpdate:m,beforeRefresh:J,afterRefresh:M,beforeValidate:z,beforeAsyncValidate:B,beforeSave:O,afterSave:Q})=>{const{t:i}=te(),ae=h(()=>({view:i("view"),edit:i("edit"),add:i("add")})),k=w(!1),c=w("add"),P=w(!1),Z=w(null),f=V({...o,[d]:void 0}),C=V({...u}),oe=h(()=>ae.value[c.value]+" "+(s||"")),ne=h(()=>c.value!=="view"),se=e=>e[d],le=()=>{j(C,u)},{changeCheckRow:ie,checkedRowKeys:T,checkedRow:N}=Ne(),de=async()=>{z&&z(f.value),B&&await B(),c.value="add",k.value=!0,j(f.value,o)},ue=async e=>{z&&z(f.value),B&&await B();let a=A(e);!e&&N.value&&(a=N.value[0]),c.value="edit",k.value=!0,j(f.value,a)},re=e=>{c.value="view",k.value=!0,j(f.value,A(e))},ce=()=>{var e;if(!["edit","add"].includes(c.value)){k.value=!1;return}(e=Z.value)==null||e.validate(async a=>{if(a)return;const p=c.value==="add"?y:m,_=c.value==="add"?i("add"):i("edit");try{P.value=!0;const F=O&&O(f.value)||f.value;if(p){const fe=await p(F);q.success({title:"",content:_+" "+i("sucess"),duration:1600}),Q&&Q(c.value,fe),P.value=k.value=!1,b()}}catch{P.value=!1}})},R=h(()=>{var e;return(e=N.value)==null?void 0:e.map(a=>a[d])}),ve=e=>{if(e===void 0&&R.value&&R.value.length===0)return;const a=X.warning({title:i("warn"),content:i("dureDelete"),positiveText:i("determine"),negativeText:i("cancellation"),onPositiveClick:async()=>{a.loading=!0;try{if(R.value,e!==void 0)r&&await r(e);else{const p=R.value.map(async _=>{if(r)return await r(_)});await Promise.all(p)}a.loading=!1,r&&q.success({title:"",content:i("delete")+" "+i("sucess"),duration:1600}),b()}catch{a.loading=!1}},onNegativeClick:()=>{console.log("取消")}})},E=w(!1),I=w(),b=async()=>{E.value=!0;try{let e={...C};n&&(e={page:(v==null?void 0:v.page)||0,pageSize:(v==null?void 0:v.pageSize)||10,...C});const a=J&&J(e);if(typeof a=="boolean"&&!a)return;a&&typeof a!="boolean"&&(e=a);const p=await Be(l,e),{data:_,total:K}=p.data,F=M&&M([..._]);F?I.value=F||[]:I.value=_||[],n&&(v.itemCount=K||0),N.value=[],T.value=[],E.value=!1}catch{E.value=!1}},{pagination:v}=Pe(b);t&&b();const pe=async()=>{const e=X.warning({title:"导出数据",content:"是否导出数据？",positiveText:i("determine"),negativeText:i("cancellation"),onPositiveClick:async()=>{e.loading=!0;try{const a={...C},p=await Te(l+"/download",a);Se(p,s),e.loading=!1,q.success({title:"",content:"导出成功",duration:1600})}catch{e.loading=!1}},onNegativeClick:()=>{console.log("取消")}})},me=h(()=>({edit:T.value.length!==1,del:!(T.value.length>0),download:n&&v.itemCount<=0}));return{modalVisible:k,modalAction:c,modalTitle:oe,modalLoading:P,modalShowFooter:ne,handlereset:le,handleAdd:de,handleDelete:ve,handleEdit:ue,handleView:re,handleDownload:pe,handleSave:ce,modalForm:f,modalFormRef:Z,defualtQuery:C,changeCheckRow:ie,loading:E,listData:I,pagination:v,listQuery:b,rowKey:se,btnDisabled:me,checkedRowKeys:T}};export{Ke as _,Ie as a,Le as u};