(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{OpKh:function(t,r,e){"use strict";e.r(r),e.d(r,"AuthenticationModule",(function(){return N}));var i=e("ofXK"),o=e("3Pt+"),n=e("tyNb"),a=e("9Ku7"),s=e("fXoL"),b=e("kmnG"),c=e("qFsG"),m=e("NFeN"),u=e("bTqV");let l=(()=>{class t{constructor(t,r,e,i){this.formBuilder=t,this.route=r,this.authService=e,this.router=i,this.submitted=!1,this.hide=!0}ngOnInit(){this.loginForm=this.formBuilder.group({email:[""],password:[""]}),this.returnUrl=this.route.snapshot.queryParams.returnUrl||"/"}get f(){return this.loginForm.controls}onSubmit(){this.submitted=!0,this.loginForm.invalid||this.authService.getAuthentication(this.loginForm.value.email,this.loginForm.value.password).subscribe(t=>{t&&this.router.navigate(["/calendar"])})}}return t.\u0275fac=function(r){return new(r||t)(s.Ob(o.d),s.Ob(n.a),s.Ob(a.a),s.Ob(n.d))},t.\u0275cmp=s.Ib({type:t,selectors:[["app-signin"]],decls:29,vars:1,consts:[[1,"limiter"],[1,"container-login100"],[1,"wrap-login100"],[1,"login100-form","validate-form",3,"formGroup","ngSubmit"],[1,"login100-form-title","pb-5"],[1,"row"],[1,"col-xl-12","col-lg-12","col-md-12","col-sm-12","mb-2"],["appearance","outline",1,"example-full-width"],["matInput","","formControlName","email"],["matSuffix",""],[1,"col-xl-12col-lg-12","col-md-12","col-sm-12","mb-2"],["matInput","","type","password","formControlName","password"],[1,"container-login100-form-btn"],["mat-flat-button","","color","primary","type","submit",1,"login100-form-btn"],[1,"text-center","p-t-30","p-b-20"],[1,"txt3"],["routerLink","/authentication/signup"]],template:function(t,r){1&t&&(s.Ub(0,"div",0),s.Ub(1,"div",1),s.Ub(2,"div",2),s.Ub(3,"form",3),s.gc("ngSubmit",(function(){return r.onSubmit()})),s.Ub(4,"span",4),s.Pc(5," Login "),s.Tb(),s.Ub(6,"div",5),s.Ub(7,"div",6),s.Ub(8,"mat-form-field",7),s.Ub(9,"mat-label"),s.Pc(10,"Email"),s.Tb(),s.Pb(11,"input",8),s.Ub(12,"mat-icon",9),s.Pc(13,"face"),s.Tb(),s.Tb(),s.Tb(),s.Tb(),s.Ub(14,"div",5),s.Ub(15,"div",10),s.Ub(16,"mat-form-field",7),s.Ub(17,"mat-label"),s.Pc(18,"Password"),s.Tb(),s.Pb(19,"input",11),s.Ub(20,"mat-icon",9),s.Pc(21,"vpn_key"),s.Tb(),s.Tb(),s.Tb(),s.Tb(),s.Ub(22,"div",12),s.Ub(23,"button",13),s.Pc(24," Login "),s.Tb(),s.Tb(),s.Ub(25,"div",14),s.Ub(26,"span",15),s.Ub(27,"a",16),s.Pc(28," sign up "),s.Tb(),s.Tb(),s.Tb(),s.Tb(),s.Tb(),s.Tb(),s.Tb()),2&t&&(s.Bb(3),s.sc("formGroup",r.loginForm))},directives:[o.v,o.n,o.g,b.c,b.f,c.b,o.c,o.m,o.f,m.a,b.g,u.a,n.e],styles:["login100-form-btn[_ngcontent-%COMP%]{background:-webkit-linear-gradient(right,#00dbde,#fc00ff)!important}login100-form-btn[_ngcontent-%COMP%]:hover{background:-webkit-linear-gradient(right,#fc00ff,#00dbde)!important}"]}),t})();var d=e("tk/3");function g(t,r){1&t&&(s.Ub(0,"mat-error"),s.Pc(1," First Name is required "),s.Tb())}function p(t,r){1&t&&(s.Ub(0,"mat-error"),s.Pc(1," Last Name is required "),s.Tb())}function f(t,r){1&t&&(s.Ub(0,"mat-error"),s.Pc(1," Please enter a valid email address "),s.Tb())}function h(t,r){1&t&&(s.Ub(0,"mat-error"),s.Pc(1," Password is required "),s.Tb())}function v(t,r){1&t&&(s.Ub(0,"mat-error"),s.Pc(1," Confirm Password is required "),s.Tb())}function T(t,r){1&t&&(s.Ub(0,"mat-error"),s.Pc(1," Username is required "),s.Tb())}function U(t,r){1&t&&(s.Ub(0,"mat-error"),s.Pc(1," Password is required "),s.Tb())}const P=[{path:"",redirectTo:"signin",pathMatch:"full"},{path:"signin",component:l},{path:"signup",component:(()=>{class t{constructor(t,r,e,i,o){this.formBuilder=t,this.route=r,this.http=e,this.authService=i,this.router=o,this.submitted=!1,this.hide=!0,this.chide=!0}ngOnInit(){this.loginForm=this.formBuilder.group({firstname:["",o.t.required],lastname:["",o.t.required],email:["",[o.t.required,o.t.email,o.t.minLength(5)]],password:["",o.t.required],cpassword:["",o.t.required]}),this.returnUrl=this.route.snapshot.queryParams.returnUrl||"/"}get f(){return this.loginForm.controls}onSubmit(){if(this.submitted=!0,this.loginForm.invalid)return;const t={Authorization:""+sessionStorage.getItem("authorization")};this.authService.registerUser({first_name:this.loginForm.value.firstname,last_name:this.loginForm.value.lastname,email:this.loginForm.value.email,password:this.loginForm.value.password,authorization:t}).subscribe(t=>{t&&this.router.navigate(["/authentication/signin"])})}}return t.\u0275fac=function(r){return new(r||t)(s.Ob(o.d),s.Ob(n.a),s.Ob(d.b),s.Ob(a.a),s.Ob(n.d))},t.\u0275cmp=s.Ib({type:t,selectors:[["app-signup"]],decls:51,vars:10,consts:[[1,"limiter"],[1,"container-login100"],[1,"wrap-login100"],[1,"login100-form","validate-form",3,"formGroup","ngSubmit"],[1,"login100-form-title","p-b-30"],["appearance","outline",1,"example-full-width"],["matInput","","formControlName","firstname","required",""],["matSuffix",""],[4,"ngIf"],["matInput","","formControlName","lastname","required",""],["matInput","","formControlName","email","required",""],["matInput","","formControlName","password","required","",3,"type"],["matSuffix","",3,"click"],["matInput","","formControlName","cpassword","required","",3,"type"],[1,"flex-sb-m","w-full","p-t-15","p-b-20"],["routerLink","/authentication/signin"],[1,"container-login100-form-btn"],["mat-flat-button","","color","primary","type","submit",1,"login100-form-btn"],[1,"login100-more",2,"background-image","url('assets/images/pages/bg-02.png')"]],template:function(t,r){1&t&&(s.Ub(0,"div",0),s.Ub(1,"div",1),s.Ub(2,"div",2),s.Ub(3,"form",3),s.gc("ngSubmit",(function(){return r.onSubmit()})),s.Ub(4,"span",4),s.Pc(5," Register "),s.Tb(),s.Ub(6,"mat-form-field",5),s.Ub(7,"mat-label"),s.Pc(8,"First Name"),s.Tb(),s.Pb(9,"input",6),s.Ub(10,"mat-icon",7),s.Pc(11,"face"),s.Tb(),s.Nc(12,g,2,0,"mat-error",8),s.Tb(),s.Ub(13,"mat-form-field",5),s.Ub(14,"mat-label"),s.Pc(15,"Last Name"),s.Tb(),s.Pb(16,"input",9),s.Ub(17,"mat-icon",7),s.Pc(18,"face"),s.Tb(),s.Nc(19,p,2,0,"mat-error",8),s.Tb(),s.Ub(20,"mat-form-field",5),s.Ub(21,"mat-label"),s.Pc(22,"Email"),s.Tb(),s.Pb(23,"input",10),s.Ub(24,"mat-icon",7),s.Pc(25,"mail"),s.Tb(),s.Nc(26,f,2,0,"mat-error",8),s.Tb(),s.Ub(27,"mat-form-field",5),s.Ub(28,"mat-label"),s.Pc(29,"Password"),s.Tb(),s.Pb(30,"input",11),s.Ub(31,"mat-icon",12),s.gc("click",(function(){return r.hide=!r.hide})),s.Pc(32),s.Tb(),s.Nc(33,h,2,0,"mat-error",8),s.Tb(),s.Ub(34,"mat-form-field",5),s.Ub(35,"mat-label"),s.Pc(36,"Confirm Password"),s.Tb(),s.Pb(37,"input",13),s.Ub(38,"mat-icon",12),s.gc("click",(function(){return r.chide=!r.chide})),s.Pc(39),s.Tb(),s.Nc(40,v,2,0,"mat-error",8),s.Tb(),s.Ub(41,"div",14),s.Ub(42,"div"),s.Ub(43,"span"),s.Pc(44,"Already Registered? "),s.Ub(45,"a",15),s.Pc(46," Login "),s.Tb(),s.Tb(),s.Tb(),s.Tb(),s.Ub(47,"div",16),s.Ub(48,"button",17),s.Pc(49," Register "),s.Tb(),s.Tb(),s.Tb(),s.Pb(50,"div",18),s.Tb(),s.Tb(),s.Tb()),2&t&&(s.Bb(3),s.sc("formGroup",r.loginForm),s.Bb(9),s.sc("ngIf",r.loginForm.get("firstname").hasError("required")),s.Bb(7),s.sc("ngIf",r.loginForm.get("lastname").hasError("required")),s.Bb(7),s.sc("ngIf",r.loginForm.get("email").hasError("required")||r.loginForm.get("email").touched),s.Bb(4),s.sc("type",r.hide?"password":"text"),s.Bb(2),s.Rc(" ",r.hide?"visibility_off":"visibility",""),s.Bb(1),s.sc("ngIf",r.loginForm.get("password").hasError("required")),s.Bb(4),s.sc("type",r.chide?"password":"text"),s.Bb(2),s.Rc(" ",r.chide?"visibility_off":"visibility",""),s.Bb(1),s.sc("ngIf",r.loginForm.get("cpassword").hasError("required")))},directives:[o.v,o.n,o.g,b.c,b.f,c.b,o.c,o.m,o.f,o.s,m.a,b.g,i.l,n.e,u.a,b.b],styles:[""]}),t})()},{path:"forgot-password",component:(()=>{class t{constructor(t,r,e){this.formBuilder=t,this.route=r,this.router=e,this.submitted=!1}ngOnInit(){this.loginForm=this.formBuilder.group({username:["",o.t.required]}),this.returnUrl=this.route.snapshot.queryParams.returnUrl||"/"}get f(){return this.loginForm.controls}onSubmit(){this.submitted=!0,this.loginForm.invalid||this.router.navigate(["/dashboard/main"])}}return t.\u0275fac=function(r){return new(r||t)(s.Ob(o.d),s.Ob(n.a),s.Ob(n.d))},t.\u0275cmp=s.Ib({type:t,selectors:[["app-forgot-password"]],decls:24,vars:2,consts:[[1,"limiter"],[1,"container-login100"],[1,"wrap-login100"],[1,"login100-form","validate-form",3,"formGroup","ngSubmit"],[1,"login100-form-title","p-b-45"],[1,"error-subheader2","p-t-20","p-b-15"],[1,"form-group","mb-5"],["appearance","outline",1,"example-full-width"],["matInput","","formControlName","username","required",""],["matSuffix",""],[4,"ngIf"],[1,"container-login100-form-btn"],["mat-flat-button","","color","primary","type","submit",1,"login100-form-btn"],[1,"w-full","p-t-25","text-center"],["routerLink","/authentication/signin",1,"txt1"],[1,"login100-more",2,"background-image","url('assets/images/pages/bg-02.png')"]],template:function(t,r){1&t&&(s.Ub(0,"div",0),s.Ub(1,"div",1),s.Ub(2,"div",2),s.Ub(3,"form",3),s.gc("ngSubmit",(function(){return r.onSubmit()})),s.Ub(4,"span",4),s.Pc(5," Reset Password "),s.Tb(),s.Ub(6,"span",5),s.Pc(7," Enter your registered email address. "),s.Tb(),s.Ub(8,"div",6),s.Ub(9,"mat-form-field",7),s.Ub(10,"mat-label"),s.Pc(11,"Username"),s.Tb(),s.Pb(12,"input",8),s.Ub(13,"mat-icon",9),s.Pc(14,"face"),s.Tb(),s.Nc(15,T,2,0,"mat-error",10),s.Tb(),s.Tb(),s.Ub(16,"div",11),s.Ub(17,"button",12),s.Pc(18," Reset My Password "),s.Tb(),s.Tb(),s.Ub(19,"div",13),s.Ub(20,"div"),s.Ub(21,"a",14),s.Pc(22," Login? "),s.Tb(),s.Tb(),s.Tb(),s.Tb(),s.Pb(23,"div",15),s.Tb(),s.Tb(),s.Tb()),2&t&&(s.Bb(3),s.sc("formGroup",r.loginForm),s.Bb(12),s.sc("ngIf",r.loginForm.get("username").hasError("required")))},directives:[o.v,o.n,o.g,b.c,b.f,c.b,o.c,o.m,o.f,o.s,m.a,b.g,i.l,u.a,n.e,b.b],styles:[""]}),t})()},{path:"locked",component:(()=>{class t{constructor(t,r,e){this.formBuilder=t,this.route=r,this.router=e,this.submitted=!1,this.hide=!0}ngOnInit(){this.loginForm=this.formBuilder.group({password:["",o.t.required]}),this.returnUrl=this.route.snapshot.queryParams.returnUrl||"/"}get f(){return this.loginForm.controls}onSubmit(){this.submitted=!0,this.loginForm.invalid||this.router.navigate(["/dashboard/main"])}}return t.\u0275fac=function(r){return new(r||t)(s.Ob(o.d),s.Ob(n.a),s.Ob(n.d))},t.\u0275cmp=s.Ib({type:t,selectors:[["app-locked"]],decls:28,vars:4,consts:[[1,"limiter"],[1,"container-login100"],[1,"wrap-login100"],[1,"login100-form","validate-form",3,"formGroup","ngSubmit"],[1,"login100-form-logo"],[1,"image"],["src","assets/images/usrbig.jpg","alt","User"],[1,"login100-form-title","p-b-34","p-t-27"],[1,"text-center"],[1,"txt1","p-b-20"],[1,"form-group","mb-3"],["appearance","outline",1,"example-full-width"],["matInput","","formControlName","password","required","",3,"type"],["matSuffix","",3,"click"],[4,"ngIf"],[1,"container-login100-form-btn","p-t-30"],["mat-flat-button","","color","primary",1,"login100-form-btn"],[1,"w-full","p-t-15","p-b-15","text-center"],["href","#",1,"txt1"],[1,"login100-more",2,"background-image","url('assets/images/pages/bg-01.png')"]],template:function(t,r){1&t&&(s.Ub(0,"div",0),s.Ub(1,"div",1),s.Ub(2,"div",2),s.Ub(3,"form",3),s.gc("ngSubmit",(function(){return r.onSubmit()})),s.Ub(4,"div",4),s.Ub(5,"div",5),s.Pb(6,"img",6),s.Tb(),s.Tb(),s.Ub(7,"span",7),s.Pc(8," Emily Smith "),s.Tb(),s.Ub(9,"div",8),s.Ub(10,"p",9),s.Pc(11," Locked "),s.Tb(),s.Tb(),s.Ub(12,"div",10),s.Ub(13,"mat-form-field",11),s.Ub(14,"mat-label"),s.Pc(15,"Password"),s.Tb(),s.Pb(16,"input",12),s.Ub(17,"mat-icon",13),s.gc("click",(function(){return r.hide=!r.hide})),s.Pc(18),s.Tb(),s.Nc(19,U,2,0,"mat-error",14),s.Tb(),s.Tb(),s.Ub(20,"div",15),s.Ub(21,"button",16),s.Pc(22," Login "),s.Tb(),s.Tb(),s.Ub(23,"div",17),s.Ub(24,"div"),s.Ub(25,"a",18),s.Pc(26," Need Help? "),s.Tb(),s.Tb(),s.Tb(),s.Tb(),s.Pb(27,"div",19),s.Tb(),s.Tb(),s.Tb()),2&t&&(s.Bb(3),s.sc("formGroup",r.loginForm),s.Bb(13),s.sc("type",r.hide?"password":"text"),s.Bb(2),s.Rc(" ",r.hide?"visibility_off":"visibility",""),s.Bb(1),s.sc("ngIf",r.loginForm.get("password").hasError("required")))},directives:[o.v,o.n,o.g,b.c,b.f,c.b,o.c,o.m,o.f,o.s,m.a,b.g,i.l,u.a,b.b],styles:[""]}),t})()},{path:"page404",component:(()=>{class t{constructor(){}ngOnInit(){}}return t.\u0275fac=function(r){return new(r||t)},t.\u0275cmp=s.Ib({type:t,selectors:[["app-page404"]],decls:18,vars:0,consts:[[1,"limiter"],[1,"container-login100"],[1,"wrap-login100"],[1,"login100-form"],[1,"error-header","p-b-45"],[1,"error-subheader","p-b-5"],[1,"error-subheader2","p-b-5"],[1,"container-login100-form-btn","p-t-30"],["mat-flat-button","","color","primary",1,"login100-form-btn"],[1,"w-full","p-t-15","p-b-15","text-center"],["href","#",1,"txt1"],[1,"login100-more",2,"background-image","url('assets/images/pages/bg-03.png')"]],template:function(t,r){1&t&&(s.Ub(0,"div",0),s.Ub(1,"div",1),s.Ub(2,"div",2),s.Ub(3,"form",3),s.Ub(4,"span",4),s.Pc(5," 404 "),s.Tb(),s.Ub(6,"span",5),s.Pc(7," Looks Like You're Lost "),s.Tb(),s.Ub(8,"span",6),s.Pc(9," The Page You Are Looking For Not Available! "),s.Tb(),s.Ub(10,"div",7),s.Ub(11,"button",8),s.Pc(12," Go To Home Page "),s.Tb(),s.Tb(),s.Ub(13,"div",9),s.Ub(14,"div"),s.Ub(15,"a",10),s.Pc(16," Need Help? "),s.Tb(),s.Tb(),s.Tb(),s.Tb(),s.Pb(17,"div",11),s.Tb(),s.Tb(),s.Tb())},directives:[o.v,o.n,o.o,u.a],styles:[""]}),t})()},{path:"page500",component:(()=>{class t{constructor(){}ngOnInit(){}}return t.\u0275fac=function(r){return new(r||t)},t.\u0275cmp=s.Ib({type:t,selectors:[["app-page500"]],decls:16,vars:0,consts:[[1,"limiter"],[1,"container-login100"],[1,"wrap-login100"],[1,"login100-form"],[1,"error-header","p-b-45"],[1,"error-subheader2","p-b-5"],[1,"container-login100-form-btn","p-t-30"],["mat-flat-button","","color","primary",1,"login100-form-btn"],[1,"w-full","p-t-15","p-b-15","text-center"],["href","#",1,"txt1"],[1,"login100-more",2,"background-image","url('assets/images/pages/bg-03.png')"]],template:function(t,r){1&t&&(s.Ub(0,"div",0),s.Ub(1,"div",1),s.Ub(2,"div",2),s.Ub(3,"form",3),s.Ub(4,"span",4),s.Pc(5," 500 "),s.Tb(),s.Ub(6,"span",5),s.Pc(7," Oops, Something went wrong. Please try after some times. "),s.Tb(),s.Ub(8,"div",6),s.Ub(9,"button",7),s.Pc(10," Go To Home Page "),s.Tb(),s.Tb(),s.Ub(11,"div",8),s.Ub(12,"div"),s.Ub(13,"a",9),s.Pc(14," Need Help? "),s.Tb(),s.Tb(),s.Tb(),s.Tb(),s.Pb(15,"div",10),s.Tb(),s.Tb(),s.Tb())},directives:[o.v,o.n,o.o,u.a],styles:[""]}),t})()}];let w=(()=>{class t{}return t.\u0275mod=s.Mb({type:t}),t.\u0275inj=s.Lb({factory:function(r){return new(r||t)},imports:[[n.f.forChild(P)],n.f]}),t})(),y=(()=>{class t{constructor(t,r){this.authService=t,this.router=r}canActivate(){return this.authService.isLoggedIn()&&this.router.navigate(["/calendar"]),!this.authService.isLoggedIn()}}return t.\u0275fac=function(r){return new(r||t)(s.cc(a.a),s.cc(n.d))},t.\u0275prov=s.Kb({token:t,factory:t.\u0275fac,providedIn:"root"}),t})(),S=(()=>{class t{constructor(t,r){this.authService=t,this.router=r}canActivate(){return this.authService.isLoggedIn()&&this.router.navigate(["/calendar"]),!this.authService.isLoggedIn()}canLoad(){return this.authService.isLoggedIn()&&this.router.navigate(["/calendar"]),!this.authService.isLoggedIn()}}return t.\u0275fac=function(r){return new(r||t)(s.cc(a.a),s.cc(n.d))},t.\u0275prov=s.Kb({token:t,factory:t.\u0275fac,providedIn:"root"}),t})();var k=e("2Vo4"),I=e("z6cu"),F=e("JIr8"),q=e("eIep"),O=e("pLZG"),x=e("IzEk");let L=(()=>{class t{constructor(t){this.authService=t,this.isRefreshing=!1,this.refreshTokenSubject=new k.a(null)}intercept(t,r){return this.authService.getJwtToken()&&(t=this.addToken(t,this.authService.getJwtToken())),r.handle(t).pipe(Object(F.a)(e=>e instanceof d.d&&401===e.status?(console.log("errorrrr"),this.handle401Error(t,r)):Object(I.a)(e)))}addToken(t,r){return t.clone({setHeaders:{Authorization:"Bearer "+r}})}handle401Error(t,r){return this.isRefreshing?this.refreshTokenSubject.pipe(Object(O.a)(t=>null!=t),Object(x.a)(1),Object(q.a)(e=>r.handle(this.addToken(t,e)))):(this.isRefreshing=!0,this.refreshTokenSubject.next(null),this.authService.refreshToken().pipe(Object(q.a)(e=>(this.isRefreshing=!1,this.refreshTokenSubject.next(e.jwt),r.handle(this.addToken(t,e.jwt))))))}}return t.\u0275fac=function(r){return new(r||t)(s.cc(a.a))},t.\u0275prov=s.Kb({token:t,factory:t.\u0275fac}),t})(),N=(()=>{class t{}return t.\u0275mod=s.Mb({type:t}),t.\u0275inj=s.Lb({factory:function(r){return new(r||t)},providers:[y,S,a.a,{provide:d.a,useClass:L,multi:!0}],imports:[[i.c,o.h,o.r,w,b.e,c.c,m.b,u.b]]}),t})()}}]);