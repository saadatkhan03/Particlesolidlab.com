/* ================= Dr. M. S. S. Khan · research website =================
   All interactivity (nav, scroll reveal, simulation studio, gallery
   filters, lightbox) lives here. Each block is a self-contained module.
   ====================================================================== */

(function(){
  "use strict";
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* nav shadow on scroll */
  var nav = document.getElementById('nav');
  var onScroll = function(){ nav.classList.toggle('scrolled', window.scrollY > 8); };
  onScroll(); window.addEventListener('scroll', onScroll, {passive:true});

  /* mobile menu */
  var burger = document.getElementById('burger'), links = document.getElementById('navLinks');
  burger.addEventListener('click', function(){ links.classList.toggle('open'); });
  links.addEventListener('click', function(e){ if(e.target.tagName==='A') links.classList.remove('open'); });

  /* scroll reveal */
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(en){ if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); } });
  }, {threshold:0.12, rootMargin:'0px 0px -40px 0px'});
  document.querySelectorAll('.reveal:not(.in)').forEach(function(el){ io.observe(el); });

  /* project accordion */
  document.querySelectorAll('.project-head').forEach(function(h){
    h.addEventListener('click', function(){
      var p = h.closest('.project'), body = p.querySelector('.project-body');
      var open = p.classList.toggle('open');
      body.style.maxHeight = open ? body.scrollHeight + 'px' : null;
    });
  });

  /* show all publications */
  var mBtn = document.getElementById('morePubsBtn'), more = document.getElementById('morePubs');
  mBtn.addEventListener('click', function(){
    var show = more.classList.toggle('show');
    mBtn.setAttribute('aria-expanded', show);
    mBtn.lastChild.textContent = show ? ' Show fewer publications' : ' Show all 12 publications';
    if(show) document.querySelectorAll('#morePubs .reveal').forEach(function(e){e.classList.add('in');});
  });

  /* collaboration form -> mailto */
  document.getElementById('collabForm').addEventListener('submit', function(e){
    e.preventDefault();
    var f = e.target, g = function(n){ return encodeURIComponent((f[n]&&f[n].value)||''); };
    var body = 'Name: '+g('name')+'%0D%0AInstitution: '+g('institution')+'%0D%0AResearch area: '+g('area')
      +'%0D%0A%0D%0ACollaboration proposal:%0D%0A'+g('proposal')+'%0D%0A%0D%0AExpected outcome:%0D%0A'+g('outcome');
    window.location.href = 'mailto:saadatkhan03@gmail.com?subject='+encodeURIComponent('Research Collaboration · '+((f.institution&&f.institution.value)||''))+'&body='+body;
  });

  /* newsletter -> mailto */
  document.getElementById('newsForm').addEventListener('submit', function(e){
    e.preventDefault();
    var mail = encodeURIComponent(document.getElementById('newsEmail').value);
    window.location.href = 'mailto:saadatkhan03@gmail.com?subject='+encodeURIComponent('Subscribe: Research Notes')+'&body='+encodeURIComponent('Please add this address to the research-notes list: ')+mail;
  });

  /* ---------- Monte-Carlo collision cascade signature ---------- */
  var svg = document.getElementById('cascade');
  if(svg && !reduce){
    var NS='http://www.w3.org/2000/svg';
    var W=460,H=262, tracks=document.getElementById('cascadeTracks'),
        defects=document.getElementById('defects'), incident=document.getElementById('incident'),
        lattice=document.getElementById('lattice');
    /* faint lattice dots below surface */
    for(var y=90;y<H-14;y+=26){ for(var x=20;x<W-10;x+=26){
      var d=document.createElementNS(NS,'circle'); d.setAttribute('cx',x); d.setAttribute('cy',y);
      d.setAttribute('r',1); d.setAttribute('fill','rgba(127,176,201,.16)'); lattice.appendChild(d);
    }}
    var rE=document.getElementById('rE'), rC=document.getElementById('rC'),
        rF=document.getElementById('rF'), rD=document.getElementById('rD');
    var cascades=0, pairs=0;

    function rnd(a,b){return a+Math.random()*(b-a);}
    function branch(x,y,angle,depth,group){
      if(depth<=0||y>H-16) return;
      var len=rnd(16,40), nx=x+Math.cos(angle)*len, ny=y+Math.abs(Math.sin(angle))*len+rnd(6,16);
      nx=Math.max(12,Math.min(W-12,nx)); ny=Math.min(H-14,ny);
      var ln=document.createElementNS(NS,'line');
      ln.setAttribute('x1',x);ln.setAttribute('y1',y);ln.setAttribute('x2',nx);ln.setAttribute('y2',ny);
      ln.setAttribute('stroke','rgba(127,176,201,.55)');ln.setAttribute('stroke-width', depth>2?1.4:0.9);
      ln.setAttribute('opacity','0'); group.appendChild(ln);
      requestAnimationFrame(function(){ ln.style.transition='opacity .5s'; ln.style.opacity='1'; });
      /* defect node */
      var col=depth>2?'#12A0AB':(Math.random()>.5?'#7fb0c9':'#B7791F');
      var nd=document.createElementNS(NS,'circle');
      nd.setAttribute('cx',nx);nd.setAttribute('cy',ny);nd.setAttribute('r', depth>2?2.6:1.9);
      nd.setAttribute('fill',col);nd.setAttribute('opacity','0');group.appendChild(nd);
      requestAnimationFrame(function(){ nd.style.transition='opacity .5s'; nd.style.opacity='.95'; });
      pairs++;
      var nb=(depth>2?2:1);
      for(var i=0;i<nb;i++){ if(Math.random()<0.85) branch(nx,ny,rnd(0.5,2.6),depth-1,group); }
    }

    function shoot(){
      var g=document.createElementNS(NS,'g'); tracks.appendChild(g);
      var startX=rnd(70,W-90);
      /* incident beam from top to surface */
      var beam=document.createElementNS(NS,'line');
      beam.setAttribute('x1',startX);beam.setAttribute('y1',0);
      beam.setAttribute('x2',startX);beam.setAttribute('y2',66);
      beam.setAttribute('stroke','url(#beam)');beam.setAttribute('stroke-width',1.6);
      g.appendChild(beam);
      /* animate incident particle down the beam then cascade */
      incident.setAttribute('cx',startX);
      var t=0, dur=520, t0=null;
      function step(ts){ if(!t0)t0=ts; t=(ts-t0)/dur;
        if(t<1){ incident.setAttribute('cy', 0+t*66); incident.setAttribute('opacity','1'); requestAnimationFrame(step); }
        else{ incident.setAttribute('opacity','0');
          cascades++; branch(startX,66,rnd(0.7,2.4),4,g);
          rC.textContent=cascades; rF.textContent=pairs;
          rD.innerHTML=(cascades*0.017).toFixed(2)+' <small>dpa</small>';
        }
      }
      requestAnimationFrame(step);
      /* fade + clear old cascades to keep it calm */
      if(tracks.children.length>4){
        var old=tracks.children[0];
        old.style.transition='opacity 1s'; old.style.opacity='0';
        setTimeout(function(){ if(old.parentNode) old.parentNode.removeChild(old); },1000);
      }
    }
    shoot();
    setInterval(shoot, 2600);
  } else if(svg){
    /* reduced motion: draw one static cascade snapshot */
    document.getElementById('rC').textContent='128';
    document.getElementById('rF').textContent='2,314';
    document.getElementById('rD').innerHTML='0.22 <small>dpa</small>';
  }
})();

;
/* ===== Simulation Studio + Geometry gallery ===== */
(function(){
  "use strict";
  var NS='http://www.w3.org/2000/svg';
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function E(n,a){var e=document.createElementNS(NS,n);if(a)for(var k in a)e.setAttribute(k,a[k]);return e;}
  function T(x,y,str,a){var t=E('text',Object.assign({x:x,y:y,'font-family':"'IBM Plex Mono',monospace"},a||{}));t.textContent=str;return t;}
  function rnd(a,b){return a+Math.random()*(b-a);}
  function clamp(v,a,b){return Math.max(a,Math.min(b,v));}
  function fade(e,fo){fo=(fo==null?0.9:fo);e.style.opacity='0';requestAnimationFrame(function(){e.style.transition='opacity .5s';e.style.opacity=fo;});return e;}
  function marker(svg,id,color){var d=E('defs');var m=E('marker',{id:id,markerWidth:7,markerHeight:7,refX:5,refY:3,orient:'auto',markerUnits:'strokeWidth'});m.appendChild(E('path',{d:'M0 0 L6 3 L0 6 Z',fill:color}));d.appendChild(m);svg.appendChild(d);}
  var C={pt:'#26C0AE',cr:'#E7913C',si:'#BADDEC',red:'#FF4D4D',emit:'#EAF4F7',beam:'#12A0AB',traj:'rgba(190,214,232,.42)',elastic:'#5BB4E8',inelastic:'#F0A93C'};

  /* ---------- A · electron–solid interaction ---------- */
  function makeEsolid(){
    var svg=document.getElementById('animEsolid'); if(!svg) return {};
    var W=540,H=340,y0=150,amp=42,per=200,sub=262;
    function sy(x){return y0-amp*Math.cos(x/per*2*Math.PI);}
    marker(svg,'esArrow',C.emit);
    svg.appendChild(E('rect',{x:0,y:sub,width:W,height:H-sub,fill:C.si,opacity:'.85'}));
    var gd='M0 '+sy(0).toFixed(1);for(var x=0;x<=W;x+=5)gd+=' L'+x+' '+sy(x).toFixed(1);gd+=' L'+W+' '+sub+' L0 '+sub+' Z';
    svg.appendChild(E('path',{d:gd,fill:C.cr,opacity:'.9'}));
    var cd='M0 '+sy(0).toFixed(1);for(var x2=0;x2<=W;x2+=5)cd+=' L'+x2+' '+sy(x2).toFixed(1);
    svg.appendChild(E('path',{d:cd,fill:'none',stroke:C.pt,'stroke-width':'9','stroke-linejoin':'round'}));
    var lat=E('g');for(var yy=y0-30;yy<sub-6;yy+=22)for(var xx=12;xx<W;xx+=24){if(yy>sy(xx)+6)lat.appendChild(E('circle',{cx:xx,cy:yy,r:'1',fill:'rgba(255,255,255,.09)'}));}svg.appendChild(lat);
    svg.appendChild(T(12,20,'VACUUM',{fill:'#7fb0c9','font-size':'10','letter-spacing':'1.5'}));
    svg.appendChild(T(W-72,sub+22,'Si SUBSTRATE',{fill:'#31576f','font-size':'10','letter-spacing':'1'}));
    var dyn=E('g');svg.appendChild(dyn);
    var nInc=0,nSE=0,nBSE=0,ep=4.0,groups=[],timer=null,active=false;
    function shot(){
      if(!active)return; nInc++;
      var x0=clamp(200+rnd(-80,80),20,W-20), ex=x0, ey=sy(x0), ang=Math.PI/2;
      var pts=[[ex,ey]], esc=null, steps=ep>6?20:13;
      for(var i=0;i<steps;i++){ang+=rnd(-1.2,1.2);var l=rnd(9,ep>6?24:18);var nx=clamp(ex+Math.cos(ang)*l,8,W-8),ny=ey+Math.sin(ang)*l;
        if(ny<sy(nx)){esc=[nx,sy(nx),ang];pts.push([nx,sy(nx)]);break;}
        if(ny>sub-3){ny=sub-3;ang=-Math.abs(ang);} ex=nx;ey=ny;pts.push([ex,ey]);}
      var g=E('g');dyn.appendChild(g);groups.push(g);
      g.appendChild(fade(E('line',{x1:x0,y1:'0',x2:pts[0][0],y2:pts[0][1],stroke:C.beam,'stroke-width':'1.8'}),1));
      var d='M'+pts.map(function(p){return p[0].toFixed(1)+' '+p[1].toFixed(1);}).join(' L');
      g.appendChild(fade(E('path',{d:d,fill:'none',stroke:C.traj,'stroke-width':'1'}),1));
      pts.slice(1).forEach(function(p){g.appendChild(fade(E('circle',{cx:p[0],cy:p[1],r:'1.7',fill:C.red}),.92));});
      var o=esc||[pts[0][0],pts[0][1],0];
      var emits=1+(Math.random()<0.6?1:0);
      for(var k=0;k<emits;k++){var a=rnd(-2.4,-0.75),tx=o[0]+Math.cos(a)*rnd(42,92),ty=o[1]+Math.sin(a)*rnd(42,92);
        g.appendChild(fade(E('line',{x1:o[0],y1:o[1],x2:tx.toFixed(1),y2:ty.toFixed(1),stroke:C.emit,'stroke-width':'1.1','marker-end':'url(#esArrow)'}),.85));
        if(Math.random()<0.72)nSE++;else nBSE++;}
      if(Math.random()<0.5){var xN=o[0]<270?rnd(360,430):rnd(20,90),ly=sy(xN),mx=(o[0]+xN)/2,my=Math.min(o[1],ly)-rnd(52,90);
        g.appendChild(fade(E('path',{d:'M'+o[0]+' '+o[1]+' Q'+mx.toFixed(0)+' '+my.toFixed(0)+' '+xN.toFixed(0)+' '+ly.toFixed(1),fill:'none',stroke:C.emit,'stroke-width':'1','stroke-dasharray':'3 3','marker-end':'url(#esArrow)'}),.7));
        g.appendChild(fade(E('circle',{cx:xN+rnd(-4,4),cy:ly+rnd(6,16),r:'1.6',fill:C.red}),.85));}
      document.getElementById('esN').textContent=nInc;
      document.getElementById('esSE').textContent=(nSE/nInc).toFixed(2);
      document.getElementById('esTot').textContent=((nSE+nBSE)/nInc).toFixed(2);
      document.getElementById('esEp').textContent=ep.toFixed(1)+' keV';
      if(groups.length>5){var old=groups.shift();old.style.transition='opacity 1.1s';old.style.opacity='0';setTimeout(function(){if(old.parentNode)old.parentNode.removeChild(old);},1100);}
      if(nInc%6===0)ep=(ep===4.0?10.0:4.0);
    }
    return {start:function(){if(reduce){if(!nInc){active=true;shot();shot();active=false;}return;}if(timer){clearInterval(timer);timer=null;}active=true;shot();timer=setInterval(shot,1500);},
            stop:function(){active=false;if(timer)clearInterval(timer);timer=null;}};
  }

  /* ---------- B · elastic vs inelastic scattering ---------- */
  function makeScatter(){
    var svg=document.getElementById('animScatter'); if(!svg) return {};
    var W=540,H=340,E0=5.0;
    marker(svg,'scArrow',C.inelastic);
    var nuclei=E('g');for(var yy=44;yy<H-30;yy+=46)for(var xx=40;xx<W-20;xx+=52){nuclei.appendChild(E('circle',{cx:xx+rnd(-8,8),cy:yy+rnd(-8,8),r:'2',fill:'rgba(127,176,201,.28)'}));}svg.appendChild(nuclei);
    svg.appendChild(T(16,24,'SOLID · atomic scattering',{fill:'#7fb0c9','font-size':'10','letter-spacing':'1'}));
    var bar=E('rect',{x:W-150,y:20,width:130,height:7,rx:3.5,fill:'rgba(255,255,255,.12)'});svg.appendChild(bar);
    var barf=E('rect',{x:W-150,y:20,width:130,height:7,rx:3.5,fill:C.emit});svg.appendChild(barf);
    var dyn=E('g');svg.appendChild(dyn);
    var x,y,ang,En,el,inl,evN,timer=null,active=false,resetT=null;
    function reset(){while(dyn.firstChild)dyn.removeChild(dyn.firstChild);x=rnd(50,120);y=28;ang=rnd(0.7,1.1);En=E0;el=0;inl=0;evN=0;upd();}
    function upd(){document.getElementById('scE').textContent=En.toFixed(2)+' keV';document.getElementById('scN').textContent=evN;document.getElementById('scEl').textContent=el;document.getElementById('scIn').textContent=inl;barf.setAttribute('width',(130*Math.max(0,En)/E0).toFixed(1));}
    function step(){
      if(!active)return;
      var len=rnd(24,44),nx=x+Math.cos(ang)*len,ny=y+Math.sin(ang)*len;
      dyn.appendChild(fade(E('line',{x1:x.toFixed(1),y1:y.toFixed(1),x2:nx.toFixed(1),y2:ny.toFixed(1),stroke:C.traj,'stroke-width':'1.4'}),.9));
      x=nx;y=ny;evN++;
      var inelastic=Math.random()<0.42;
      if(inelastic){inl++;En-=rnd(0.2,0.6);ang+=rnd(-0.4,0.4);
        dyn.appendChild(fade(E('circle',{cx:x,cy:y,r:'3.4',fill:C.inelastic}),.95));
        var sa=rnd(0,2*Math.PI),sx=x+Math.cos(sa)*rnd(20,34),sy2=y+Math.sin(sa)*rnd(20,34);
        dyn.appendChild(fade(E('line',{x1:x,y1:y,x2:sx.toFixed(1),y2:sy2.toFixed(1),stroke:C.inelastic,'stroke-width':'1','marker-end':'url(#scArrow)'}),.8));
        dyn.appendChild(fade(T(x+6,y-6,'e⁻',{fill:C.inelastic,'font-size':'9'}),.85));
      }else{el++;ang+=(Math.random()<0.5?1:-1)*rnd(0.7,2.1);
        dyn.appendChild(E('circle',{cx:x,cy:y,r:'3',fill:'none',stroke:C.elastic,'stroke-width':'1.6'}));
        dyn.appendChild(fade(E('circle',{cx:x,cy:y,r:'1.6',fill:C.elastic}),.95));}
      upd();
      if(En<=0.35||x<10||x>W-10||y>H-14){
        dyn.appendChild(fade(T(clamp(x,20,W-70),clamp(y+16,30,H-8),'thermalized',{fill:'#8fb0c9','font-size':'10'}),.8));
        if(timer)clearInterval(timer);timer=null;
        resetT=setTimeout(function(){if(active){reset();timer=setInterval(step,560);}},1400);
      }
    }
    return {start:function(){reset();if(reduce){active=true;for(var i=0;i<9&&En>0.5;i++)step();active=false;return;}if(timer){clearInterval(timer);timer=null;}if(resetT){clearTimeout(resetT);resetT=null;}active=true;timer=setInterval(step,560);},
            stop:function(){active=false;if(timer)clearInterval(timer);if(resetT)clearTimeout(resetT);timer=null;}};
  }

  /* ---------- C · collision cascade ---------- */
  function makeCascade(){
    var svg=document.getElementById('animCascade'); if(!svg) return {};
    var W=540,H=340,surf=92;
    var grad=E('defs');var lg=E('linearGradient',{id:'caBeam',x1:'0',y1:'0',x2:'1',y2:'1'});lg.appendChild(E('stop',{offset:'0','stop-color':'#12A0AB'}));lg.appendChild(E('stop',{offset:'1','stop-color':'#7fb0c9'}));grad.appendChild(lg);svg.appendChild(grad);
    svg.appendChild(E('line',{x1:'0',y1:surf,x2:W,y2:surf,stroke:'rgba(127,176,201,.28)','stroke-width':'1','stroke-dasharray':'3 5'}));
    svg.appendChild(T(14,surf-10,'SURFACE / VACUUM',{fill:'#6f9ab5','font-size':'9','letter-spacing':'1'}));
    svg.appendChild(T(W-60,surf+18,'SOLID',{fill:'#4d7a94','font-size':'9','letter-spacing':'1'}));
    var lat=E('g');for(var yy=surf+22;yy<H-14;yy+=24)for(var xx=18;xx<W;xx+=24)lat.appendChild(E('circle',{cx:xx,cy:yy,r:'1',fill:'rgba(127,176,201,.13)'}));svg.appendChild(lat);
    var tracks=E('g');svg.appendChild(tracks);
    var casc=0,pairs=0,active=false,timer=null;
    function branch(g,x,y,ang,depth){if(depth<=0||y>H-16)return;var len=rnd(16,38),nx=clamp(x+Math.cos(ang)*len,12,W-12),ny=Math.min(H-14,y+Math.abs(Math.sin(ang))*len+rnd(6,15));
      g.appendChild(fade(E('line',{x1:x,y1:y,x2:nx.toFixed(1),y2:ny.toFixed(1),stroke:'rgba(127,176,201,.5)','stroke-width':depth>2?1.4:0.9}),1));
      var col=depth>2?'#12A0AB':(Math.random()>0.5?'#7fb0c9':'#B7791F');
      g.appendChild(fade(E('circle',{cx:nx,cy:ny,r:depth>2?2.6:1.9,fill:col}),.95));pairs++;
      var nb=depth>2?2:1;for(var i=0;i<nb;i++)if(Math.random()<0.85)branch(g,nx,ny,rnd(0.5,2.6),depth-1);}
    function shot(){if(!active)return;var g=E('g');tracks.appendChild(g);var sx=rnd(80,W-90);
      g.appendChild(E('line',{x1:sx,y1:'0',x2:sx,y2:surf,stroke:'url(#caBeam)','stroke-width':'1.7'}));
      casc++;branch(g,sx,surf,rnd(0.7,2.4),4);
      document.getElementById('caC').textContent=casc;document.getElementById('caF').textContent=pairs;
      document.getElementById('caD').textContent=(casc*0.017).toFixed(2)+' dpa';
      if(tracks.children.length>4){var old=tracks.children[0];old.style.transition='opacity 1s';old.style.opacity='0';setTimeout(function(){if(old.parentNode)old.parentNode.removeChild(old);},1000);}}
    return {start:function(){if(reduce){if(!casc){active=true;shot();shot();active=false;}return;}if(timer){clearInterval(timer);timer=null;}active=true;shot();timer=setInterval(shot,2400);},
            stop:function(){active=false;if(timer)clearInterval(timer);timer=null;}};
  }

  /* ---------- D · geometry construction pipeline ---------- */
  function makeGeometry(){
    var svg=document.getElementById('animGeometry'); if(!svg) return {};
    var W=540,H=340,bx=70,by=54,bw=400,bh=210;
    var frame=E('rect',{x:bx-14,y:by-14,width:bw+28,height:bh+40,rx:12,fill:'rgba(255,255,255,.03)',stroke:'rgba(127,176,201,.14)'});svg.appendChild(frame);
    var groups=[E('g'),E('g'),E('g'),E('g')];groups.forEach(function(g){svg.appendChild(g);});
    var y0=by+bh*0.40,amp=bh*0.17,per=bw/2.2,subL=by+bh*0.80;
    function sy(x){return y0-amp*Math.cos((x-bx)/per*2*Math.PI);}
    function coloredModel(g){
      g.appendChild(E('rect',{x:bx,y:subL,width:bw,height:(by+bh)-subL,fill:C.si}));
      var d='M'+bx+' '+sy(bx).toFixed(1);for(var x=bx;x<=bx+bw;x+=5)d+=' L'+x+' '+sy(x).toFixed(1);d+=' L'+(bx+bw)+' '+subL+' L'+bx+' '+subL+' Z';
      g.appendChild(E('path',{d:d,fill:C.cr}));
      var c='M'+bx+' '+sy(bx).toFixed(1);for(var x2=bx;x2<=bx+bw;x2+=5)c+=' L'+x2+' '+sy(x2).toFixed(1);
      g.appendChild(E('path',{d:c,fill:'none',stroke:C.pt,'stroke-width':'8','stroke-linejoin':'round'}));
    }
    /* a · TEM */
    (function(g){g.appendChild(E('rect',{x:bx,y:by,width:bw,height:bh,fill:'#c9d2da'}));
      g.appendChild(E('rect',{x:bx,y:by+bh*0.46,width:bw,height:bh*0.54,fill:'#9aa6b0'}));
      var d='M'+bx+' '+(by+bh*0.30).toFixed(1);for(var x=bx;x<=bx+bw;x+=4)d+=' L'+x+' '+(by+bh*0.30 - amp*0.8*Math.cos((x-bx)/per*2*Math.PI)+rnd(-2,2)).toFixed(1);
      g.appendChild(E('path',{d:d,fill:'none',stroke:'#1e2a33','stroke-width':'3'}));
      g.appendChild(E('line',{x1:bx+24,y1:by+bh-24,x2:bx+104,y2:by+bh-24,stroke:'#1e2a33','stroke-width':'3'}));
      g.appendChild(T(bx+30,by+bh-32,'200 nm',{fill:'#1e2a33','font-size':'11','font-weight':'600'}));
      g.appendChild(T(bx+2,by-22,'(a) Experimental TEM image',{fill:'#cfe0ee','font-size':'12'}));})(groups[0]);
    /* b · model */
    (function(g){coloredModel(g);
      function lbl(x,yv,txt,col){g.appendChild(E('circle',{cx:x,cy:yv,r:'3',fill:col}));g.appendChild(T(x+8,yv+4,txt,{fill:'#e6f2f7','font-size':'11','font-weight':'600'}));}
      lbl(bx+bw-96,by+18,'Pt coating',C.pt);lbl(bx+bw-96,by+40,'Cr grating',C.cr);lbl(bx+bw-96,by+62,'Si substrate',C.si);
      g.appendChild(T(bx+2,by-22,'(b) Material model · Pt / Cr / Si',{fill:'#cfe0ee','font-size':'12'}));})(groups[1]);
    /* c · parameters */
    (function(g){coloredModel(g);
      var crestX=bx+per/2,crestY=sy(crestX),valX=bx+per,valY=sy(valX);
      g.appendChild(E('line',{x1:crestX,y1:crestY,x2:crestX,y2:subL,stroke:'#e6f2f7','stroke-width':'1','stroke-dasharray':'3 3'}));g.appendChild(T(crestX+5,(crestY+subL)/2,'h',{fill:'#e6f2f7','font-size':'12','font-style':'italic'}));
      g.appendChild(E('line',{x1:bx,y1:subL,x2:bx,y2:by+bh,stroke:'#e6f2f7','stroke-width':'1','stroke-dasharray':'3 3'}));g.appendChild(T(bx+5,subL+22,'b',{fill:'#e6f2f7','font-size':'12','font-style':'italic'}));
      g.appendChild(E('line',{x1:bx,y1:by+bh+14,x2:bx+per*2,y2:by+bh+14,stroke:'#9dc4dc','stroke-width':'1','marker-start':'url(#geoA)','marker-end':'url(#geoA)'}));
      g.appendChild(T(bx+per-6,by+bh+28,'λ',{fill:'#9dc4dc','font-size':'12','font-style':'italic'}));
      g.appendChild(E('line',{x1:valX+per*0.5,y1:sy(valX+per*0.5)-6,x2:valX+per*0.5+16,y2:sy(valX+per*0.5)-16,stroke:'#e6f2f7','stroke-width':'1'}));g.appendChild(T(valX+per*0.5+18,sy(valX+per*0.5)-16,'s',{fill:'#e6f2f7','font-size':'11','font-style':'italic'}));
      g.appendChild(T(bx+per*1.4,by-4,'θ',{fill:'#e6f2f7','font-size':'12','font-style':'italic'}));
      g.appendChild(T(bx+2,by-22,'(c) Defining parameters · region of interest',{fill:'#cfe0ee','font-size':'12'}));})(groups[2]);
    /* d · 3D FETM */
    (function(g){var slices=8,sdx=bw*0.12/slices,sdy=bh*0.30/slices,fw=bw*0.74,fox=bx+bw*0.05,foy=by+bh*0.34,p3=fw/2.4,a3=bh*0.12,yy0=0,baseY=by+bh*0.74;
      function s3(x){return yy0-a3*Math.cos(x/p3*2*Math.PI);}
      var sk='M'+fox+' '+(s3(0)+foy).toFixed(1);for(var x=0;x<=fw;x+=5)sk+=' L'+(fox+x)+' '+(s3(x)+foy).toFixed(1);sk+=' L'+(fox+fw)+' '+baseY+' L'+fox+' '+baseY+' Z';
      g.appendChild(E('path',{d:sk,fill:C.cr,opacity:'.95'}));
      g.appendChild(E('path',{d:'M'+fox+' '+baseY+' L'+(fox+fw)+' '+baseY+' L'+(fox+fw+bw*0.10)+' '+(baseY-bh*0.16)+' L'+(fox+bw*0.10)+' '+(baseY-bh*0.16)+' Z',fill:C.si,opacity:'.7'}));
      for(var s=slices;s>=0;s--){var ox=fox+s*sdx,oy=foy-s*sdy,dd='M'+ox+' '+(s3(0)+oy).toFixed(1);for(var x2=0;x2<=fw;x2+=5)dd+=' L'+(ox+x2)+' '+(s3(x2)+oy).toFixed(1);
        g.appendChild(E('path',{d:dd,fill:'none',stroke:s===0?C.pt:'rgba(38,192,174,'+(0.30+0.55*(1-s/slices)).toFixed(2)+')','stroke-width':s===0?'2.2':'1'}));}
      for(var xi=0;xi<=fw;xi+=fw/12){var x1=fox+xi,y1=s3(xi)+foy,x2b=fox+slices*sdx+xi,y2b=s3(xi)+foy-slices*sdy;g.appendChild(E('line',{x1:x1.toFixed(1),y1:y1.toFixed(1),x2:x2b.toFixed(1),y2:y2b.toFixed(1),stroke:'rgba(38,192,174,.26)','stroke-width':'0.7'}));}
      g.appendChild(T(bx+2,by-22,'(d) 3D FETM mesh → Monte Carlo input',{fill:'#cfe0ee','font-size':'12'}));})(groups[3]);
    /* arrow marker for lambda */
    marker(svg,'geoA','#9dc4dc');
    var labels=['a · Experimental TEM','b · Material model','c · Parameters','d · 3D FETM mesh'];
    var step=0,timer=null,active=false;
    var chips=[].slice.call(document.querySelectorAll('#geoSteps .geo-step-chip'));
    function show(i){step=i;groups.forEach(function(g,idx){g.style.transition='opacity .5s';g.style.opacity=(idx===i?1:0);});
      chips.forEach(function(c,idx){c.classList.toggle('on',idx===i);});
      var st=document.getElementById('geoStage');if(st)st.textContent=labels[i];}
    chips.forEach(function(c){c.addEventListener('click',function(){show(+c.getAttribute('data-step'));if(timer){clearInterval(timer);timer=setInterval(function(){if(active)show((step+1)%4);},2400);}});});
    show(0);
    return {start:function(){if(reduce){show(1);return;}if(timer){clearInterval(timer);timer=null;}active=true;timer=setInterval(function(){if(active)show((step+1)%4);},2400);},
            stop:function(){active=false;if(timer)clearInterval(timer);timer=null;}};
  }

  /* ---------- studio controller ---------- */
  var anims={}, order=['esolid','scatter','cascade','geometry'], factories={esolid:makeEsolid,scatter:makeScatter,cascade:makeCascade,geometry:makeGeometry};
  order.forEach(function(k){anims[k]=factories[k]();});
  var current='esolid', visible=false;
  function stopAll(){order.forEach(function(k){if(anims[k]&&anims[k].stop)anims[k].stop();});}
  function run(){if(visible&&anims[current]&&anims[current].start)anims[current].start();}
  var tabs=[].slice.call(document.querySelectorAll('#studioTabs .stab'));
  var panels=[].slice.call(document.querySelectorAll('.studio-body .stage-panel'));
  tabs.forEach(function(t){t.addEventListener('click',function(){
    var tab=t.getAttribute('data-tab');
    tabs.forEach(function(x){var on=x===t;x.classList.toggle('active',on);x.setAttribute('aria-selected',on);});
    panels.forEach(function(p){p.classList.toggle('active',p.getAttribute('data-anim')===tab);});
    stopAll();current=tab;run();
  });});
  var studio=document.getElementById('studio');
  if(studio){var io=new IntersectionObserver(function(es){es.forEach(function(en){visible=en.isIntersecting;if(visible)run();else stopAll();});},{threshold:0.14});io.observe(studio);}

  /* ---------- geometry gallery (static illustrations) ---------- */
  function galWave2D(){var svg=document.getElementById('geoWave2D');if(!svg)return;var W=420,Hh=228,bx=24,by=26,bw=372,bh=176,y0=by+bh*0.4,amp=bh*0.18,per=bw/2.2,subL=by+bh*0.8;
    function sy(x){return y0-amp*Math.cos((x-bx)/per*2*Math.PI);}
    svg.appendChild(E('rect',{x:bx,y:subL,width:bw,height:(by+bh)-subL,fill:C.si}));
    var d='M'+bx+' '+sy(bx).toFixed(1);for(var x=bx;x<=bx+bw;x+=5)d+=' L'+x+' '+sy(x).toFixed(1);d+=' L'+(bx+bw)+' '+subL+' L'+bx+' '+subL+' Z';svg.appendChild(E('path',{d:d,fill:C.cr}));
    var c='M'+bx+' '+sy(bx).toFixed(1);for(var x2=bx;x2<=bx+bw;x2+=5)c+=' L'+x2+' '+sy(x2).toFixed(1);svg.appendChild(E('path',{d:c,fill:'none',stroke:C.pt,'stroke-width':'8','stroke-linejoin':'round'}));
    svg.appendChild(T(bx+2,by+bh+16,'λ · h · s · b',{fill:'#9dc4dc','font-size':'10','letter-spacing':'1'}));}
  function galWave3D(){var svg=document.getElementById('geoWave3D');if(!svg)return;var W=420,Hh=228,bx=30,by=20,bw=360,bh=190;
    var slices=9,sdx=bw*0.11/slices,sdy=bh*0.34/slices,fw=bw*0.76,fox=bx,foy=by+bh*0.34,p3=fw/2.6,a3=bh*0.13,baseY=by+bh*0.78;
    function s3(x){return -a3*Math.cos(x/p3*2*Math.PI);}
    var sk='M'+fox+' '+(s3(0)+foy).toFixed(1);for(var x=0;x<=fw;x+=5)sk+=' L'+(fox+x)+' '+(s3(x)+foy).toFixed(1);sk+=' L'+(fox+fw)+' '+baseY+' L'+fox+' '+baseY+' Z';svg.appendChild(E('path',{d:sk,fill:C.cr,opacity:'.95'}));
    svg.appendChild(E('path',{d:'M'+fox+' '+baseY+' L'+(fox+fw)+' '+baseY+' L'+(fox+fw+bw*0.1)+' '+(baseY-bh*0.16)+' L'+(fox+bw*0.1)+' '+(baseY-bh*0.16)+' Z',fill:C.si,opacity:'.7'}));
    for(var s=slices;s>=0;s--){var ox=fox+s*sdx,oy=foy-s*sdy,dd='M'+ox+' '+(s3(0)+oy).toFixed(1);for(var x2=0;x2<=fw;x2+=5)dd+=' L'+(ox+x2)+' '+(s3(x2)+oy).toFixed(1);svg.appendChild(E('path',{d:dd,fill:'none',stroke:s===0?C.pt:'rgba(38,192,174,'+(0.30+0.55*(1-s/slices)).toFixed(2)+')','stroke-width':s===0?'2.2':'1'}));}
    for(var xi=0;xi<=fw;xi+=fw/12){var x1=fox+xi,y1=s3(xi)+foy,x2b=fox+slices*sdx+xi,y2b=s3(xi)+foy-slices*sdy;svg.appendChild(E('line',{x1:x1.toFixed(1),y1:y1.toFixed(1),x2:x2b.toFixed(1),y2:y2b.toFixed(1),stroke:'rgba(38,192,174,.24)','stroke-width':'0.7'}));}}
  function galCore(){var svg=document.getElementById('geoCoreShell');if(!svg)return;var cx=210,cy=114,r=78;marker(svg,'csA','#EAF4F7');
    svg.appendChild(E('ellipse',{cx:cx,cy:cy,rx:r,ry:r*0.82,fill:C.pt,opacity:'.92'}));
    svg.appendChild(E('ellipse',{cx:cx,cy:cy,rx:r*0.72,ry:r*0.72*0.82,fill:C.cr}));
    svg.appendChild(E('ellipse',{cx:cx,cy:cy,rx:r*0.4,ry:r*0.4*0.82,fill:C.si}));
    for(var a=0;a<Math.PI;a+=Math.PI/8){svg.appendChild(E('line',{x1:(cx-Math.cos(a)*r).toFixed(1),y1:(cy-Math.sin(a)*r*0.82).toFixed(1),x2:(cx+Math.cos(a)*r).toFixed(1),y2:(cy+Math.sin(a)*r*0.82).toFixed(1),stroke:'rgba(255,255,255,.14)','stroke-width':'0.7'}));}
    for(var k=0;k<8;k++){var ang=rnd(-Math.PI*0.95,-0.05),ex=cx+Math.cos(ang)*r,ey=cy+Math.sin(ang)*r*0.82;svg.appendChild(E('line',{x1:ex.toFixed(1),y1:ey.toFixed(1),x2:(ex+Math.cos(ang)*26).toFixed(1),y2:(ey+Math.sin(ang)*26).toFixed(1),stroke:'#EAF4F7','stroke-width':'1','marker-end':'url(#csA)',opacity:'.75'}));}
    svg.appendChild(T(20,26,'XPS photoemission',{fill:'#9dc4dc','font-size':'10','letter-spacing':'1'}));}
  function galSuper(){var svg=document.getElementById('geoSuperlattice');if(!svg)return;var bx=40,by=34,bw=340,bh=160;
    svg.appendChild(E('path',{d:'M'+bx+' '+(by+bh)+' L'+(bx+bw)+' '+(by+bh)+' L'+(bx+bw+34)+' '+(by+bh-30)+' L'+(bx+34)+' '+(by+bh-30)+' Z',fill:'rgba(231,145,60,.16)',stroke:'rgba(231,145,60,.4)'}));
    svg.appendChild(E('rect',{x:bx,y:by,width:bw,height:bh,fill:'rgba(231,145,60,.10)',stroke:'rgba(231,145,60,.35)'}));
    svg.appendChild(E('path',{d:'M'+(bx+bw)+' '+by+' L'+(bx+bw+34)+' '+(by-30)+' L'+(bx+bw+34)+' '+(by+bh-30)+' L'+(bx+bw)+' '+(by+bh),fill:'rgba(231,145,60,.14)',stroke:'rgba(231,145,60,.35)'}));
    for(var r=0;r<4;r++)for(var c2=0;c2<7;c2++){var px=bx+30+c2*46+(r%2?18:0),py=by+30+r*38;if(px<bx+bw-14){svg.appendChild(E('circle',{cx:px,cy:py,r:'11',fill:C.pt,opacity:'.92'}));svg.appendChild(E('circle',{cx:px,cy:py,r:'11',fill:'none',stroke:'#0d5a52','stroke-width':'1'}));svg.appendChild(E('circle',{cx:px-3,cy:py-3,r:'3.5',fill:'rgba(255,255,255,.4)'}));}}
    svg.appendChild(T(20,24,'nanoparticle array in matrix',{fill:'#9dc4dc','font-size':'10','letter-spacing':'1'}));}
  galWave2D();galWave3D();galCore();galSuper();

})();

;
(function(){
  "use strict";
  var lb=document.getElementById('lightbox'),img=document.getElementById('lbimg'),cap=document.getElementById('lbcap');
  function openLB(src,c){img.src=src;cap.textContent=c||'';lb.classList.add('on');lb.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';}
  function closeLB(){lb.classList.remove('on');lb.setAttribute('aria-hidden','true');document.body.style.overflow='';img.src='';}
  document.addEventListener('click',function(e){
    var t=e.target.closest('[data-cap]');
    if(t){var im=(t.tagName==='IMG')?t:t.querySelector('img');if(im){e.preventDefault();openLB(im.currentSrc||im.src,t.getAttribute('data-cap'));return;}}
    if(e.target.closest('.lbclose')||e.target===lb){closeLB();}
  });
  document.addEventListener('keydown',function(e){if(e.key==='Escape')closeLB();});
  /* gallery filters */
  var chips=[].slice.call(document.querySelectorAll('#galFilters .gal-chip'));
  var cards=[].slice.call(document.querySelectorAll('#galGrid .figcard'));
  chips.forEach(function(c){c.addEventListener('click',function(){
    chips.forEach(function(x){x.classList.toggle('on',x===c);});
    var f=c.getAttribute('data-f');
    cards.forEach(function(card){
      var cat=(card.getAttribute('data-cat')||'').split(' ');
      var show=(f==='all')||cat.indexOf(f)>=0;
      card.classList.toggle('hidden',!show);
      if(show)card.classList.add('in');
    });
  });});

  /* citations: resolve absolute URLs + copy-to-clipboard */
  [].slice.call(document.querySelectorAll('.cite-url[data-path]')).forEach(function(el){
    try{ el.textContent = new URL(el.getAttribute('data-path'), window.location.href).href; }catch(e){}
  });
  function citeFallback(txt, done){ var ta=document.createElement('textarea'); ta.value=txt; ta.style.position='fixed'; ta.style.opacity='0'; document.body.appendChild(ta); ta.focus(); ta.select(); try{document.execCommand('copy');}catch(e){} document.body.removeChild(ta); done(); }
  [].slice.call(document.querySelectorAll('.cite-copy')).forEach(function(btn){
    btn.addEventListener('click', function(){
      var t=document.getElementById(btn.getAttribute('data-target')); if(!t) return;
      var txt=t.textContent.replace(/\s+/g,' ').trim();
      var done=function(){ btn.classList.add('copied'); btn.textContent='Copied \u2713'; setTimeout(function(){btn.classList.remove('copied'); btn.textContent='Copy';},1600); };
      if(navigator.clipboard&&navigator.clipboard.writeText){ navigator.clipboard.writeText(txt).then(done, function(){citeFallback(txt,done);}); } else { citeFallback(txt,done); }
    });
  });
})();
/* ---- WeChat ID copy ---- */
(function(){
  var btn=document.getElementById('wechatCopy'); if(!btn) return;
  var lbl=document.getElementById('wechatLabel');
  var id=btn.getAttribute('data-id')||'';
  function flash(){
    btn.classList.add('copied');
    if(lbl){ lbl.textContent='Copied ✓'; }
    setTimeout(function(){ btn.classList.remove('copied'); if(lbl){ lbl.textContent=id; } },1600);
  }
  function fallback(){
    var ta=document.createElement('textarea'); ta.value=id; ta.style.position='fixed'; ta.style.opacity='0';
    document.body.appendChild(ta); ta.focus(); ta.select();
    try{ document.execCommand('copy'); }catch(e){}
    document.body.removeChild(ta); flash();
  }
  btn.addEventListener('click', function(){
    if(navigator.clipboard && navigator.clipboard.writeText){
      navigator.clipboard.writeText(id).then(flash, fallback);
    } else { fallback(); }
  });
})();
