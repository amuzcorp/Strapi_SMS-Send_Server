"use strict";(self["webpackChunkfrontend"]=self["webpackChunkfrontend"]||[]).push([[883],{9883:function(t,s,n){n.r(s),n.d(s,{default:function(){return y}});var e=n(6252),a=n(9963),o=n(3577);const l={style:{"margin-top":"20px",display:"inline-block",width:"80vw"}},r=(0,e._)("h1",{class:"h3 mb-3 fw-normal"},"로그인",-1),i={class:"form-floating"},d=(0,e._)("label",{for:"floatingInput"},"이메일 또는 아이디",-1),u={class:"form-floating"},m=(0,e._)("label",{for:"floatingPassword"},"비밀번호",-1),c={style:{"margin-top":"36px"}},p=(0,e._)("p",{class:"mt-5 mb-3 text-muted"},"© khs",-1);function f(t,s,n,f,w,h){return(0,e.wg)(),(0,e.iD)("div",l,[r,(0,e._)("div",i,[(0,e.wy)((0,e._)("input",{type:"text",class:"form-control",id:"floatingInput",placeholder:"name@example.com","onUpdate:modelValue":s[0]||(s[0]=t=>w.username=t)},null,512),[[a.nr,w.username]]),d]),(0,e._)("div",u,[(0,e.wy)((0,e._)("input",{type:"password",class:"form-control",id:"floatingPassword",placeholder:"Password","onUpdate:modelValue":s[1]||(s[1]=t=>w.password=t)},null,512),[[a.nr,w.password]]),m]),(0,e._)("div",c,[(0,e._)("span",null,(0,o.zw)(w.msg),1)]),(0,e._)("button",{class:"w-90 btn btn-lg mt-5",style:{color:"#fff"},type:"submit",onClick:s[2]||(s[2]=(...t)=>h.login&&h.login(...t))}," 로그인 "),p])}var w=n(9669),h=n.n(w),g={name:"loginView",components:{},data(){return{username:"",password:"",msg:""}},setup(){},created(){},mounted(){},unmounted(){},methods:{async login(){await h().post("/api/auth/local",{identifier:this.username,password:this.password}).then((t=>{localStorage.setItem("jwt",t.data.jwt),this.$router.push({name:"home"}),this.$store.commit("loginSuccess",t.data.user)})).catch((()=>{this.msg="아이디 또는 비밀번호가 일치하지 않습니다."}))}}},b=n(3744);const _=(0,b.Z)(g,[["render",f]]);var y=_}}]);
//# sourceMappingURL=883.9263fc4c.js.map