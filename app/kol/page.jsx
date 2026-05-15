'use client';
// @ts-nocheck
import { useState, useMemo, useCallback, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { RAW_KOLS, RAW_FUNDS, RAW_TWEETS } from './data';

const FL = () => { useEffect(() => { const l = document.createElement("link"); l.rel = "stylesheet"; l.href = "https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Inter:wght@400;500;600;700;800&display=swap"; document.head.appendChild(l); }, []); return null; };

const T = {
  bgBase:"#070707",bgSurface:"#0D0D0D",bgCard:"#121814",bgGlow:"#002814",
  borderCard:"#1E2E24",borderNeutral:"#222222",borderKill:"#441818",borderSubtle:"#181818",
  textPrimary:"#F0F0F0",textSecondary:"#AAAAAA",textMuted:"#888888",textDim:"#555555",textFooter:"#444444",
  green:"#00EC97",greenDark:"#003020",redText:"#CC8888",bgCardKill:"#1A0808",
  mono:"'Space Mono',monospace",display:"'Inter',sans-serif",
};




// Fund tagging from descriptions (unchanged)
const tagFund=(d,f,r)=>{const s=(d+" "+f+" "+r).toLowerCase();const t=[];if(/paradigm|a16z|dragonfly|multicoin|pantera|framework|blockchain cap|haun|delphi|1kx|hack vc|electric|1confirmation|archetype/.test(s))t.push("Tier 1 VC");if(/defi|yield|protocol/.test(s))t.push("DeFi");if(/\bai\b|artificial|machine learn/.test(s))t.push("AI");if(/gaming|nft|metaverse|sfermion/.test(s))t.push("Gaming/NFT");if(/bitcoin|btc opportunity/.test(s))t.push("Bitcoin");if(/infrastructure|infra|modular/.test(s))t.push("Infrastructure");if(/consumer/.test(s))t.push("Consumer");if(/quant|hedge|market maker|prop fund/.test(s))t.push("Liquid/Quant");if(/macro|goldman|bridgewater|lehman|citadel|jpmorgan/.test(s))t.push("Institutional");return t.length?t:["Venture Capital"];};

// For OLD-source KOLs without explicit Tags/Type, infer them
const inferTagsFromBio=(d)=>{if(!d)return[];const s=d.toLowerCase();const out=[];if(/defi|protocol|yield|dex/.test(s))out.push("DeFi");if(/\bai\b|artificial|agentic|llm/.test(s))out.push("AI");if(/bitcoin|\bbtc\b|ordinals|satoshi/.test(s))out.push("BTC");if(/macro|economics|fed|inflation/.test(s))out.push("Macro");if(/nft|gaming|metaverse|memecoin/.test(s))out.push("Memecoins");if(/privacy|zk|zero.knowledge/.test(s))out.push("Privacy");if(/\bl2\b|layer.2|rollup/.test(s))out.push("L2s");if(/solana|\bsol\b/.test(s))out.push("SOL");if(/ethereum|\beth\b/.test(s))out.push("ETH");if(/infra|infrastructure/.test(s))out.push("Infra");if(/rwa/.test(s))out.push("RWAs");return out;};
const inferType=(d)=>{if(!d)return"Trader / TA";const s=d.toLowerCase();if(/founder|ceo|cto|building|co-founder/.test(s))return"Founder / Operator";if(/research|analyst|analysis/.test(s))return"Researcher / Analyst";if(/journal|writer|reporter|media|publisher/.test(s))return"Journalist / Media";if(/venture|\bvc\b|fund|investor|angel/.test(s))return"VC / Fund";if(/macro|economics/.test(s))return"Macro / Investor";if(/builder|engineer|developer/.test(s))return"Builder / Engineer";if(/influencer|content|youtube|podcast|educator/.test(s))return"Influencer / Commentator";return"Trader / TA";};

const TIER_C={Mega:T.green,Large:"#4ADE80",Mid:"#A3E635",Micro:"#FDE047"};

const KOLS=RAW_KOLS.map(k=>{
  const t=k.Tags&&k.Tags.length?k.Tags:inferTagsFromBio(k.Description);
  const type=k.Type||inferType(k.Description);
  const tier=k.Followers>=1e6?"Mega":k.Followers>=250000?"Large":k.Followers>=50000?"Mid":"Micro";
  return{...k,Tags:t,Type:type,tier,nearAligned:(k["NEAR Mentions"]||0)>0};
});

const FUNDS=RAW_FUNDS.map(f=>({...f,tags:tagFund(f.Description||"",f.Fund||"",f.Role||""),nearAligned:/near/.test((f.Description||"").toLowerCase())||(f.Handle||"").toLowerCase().includes("near")}));

const fmt=n=>{if(n===undefined||n===null||n==="")return"—";const num=Number(n);if(isNaN(num))return"—";if(num>=1e6)return(num/1e6).toFixed(1)+"M";if(num>=1e3)return(num/1e3).toFixed(1)+"K";return String(num);};

// Primitives
const SL=({children})=>(<div style={{display:"flex",alignItems:"center",gap:8,fontFamily:T.mono,fontSize:10,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:T.green,marginBottom:10}}><div style={{width:5,height:14,background:T.green,flexShrink:0,borderRadius:1}}/>{children}</div>);
const Card=({children,style={},kill=false})=>(<div onMouseEnter={e=>{if(!kill)e.currentTarget.style.borderColor="rgba(0,236,151,0.3)";}} onMouseLeave={e=>{e.currentTarget.style.borderColor=kill?T.borderKill:T.borderCard;}} style={{background:kill?"#1A0808":T.bgCard,border:`0.5px solid ${kill?T.borderKill:T.borderCard}`,borderRadius:8,padding:"18px 20px",overflow:"hidden",transition:"border-color 0.2s",...style}}>{children}</div>);
const Tag=({children,green=false})=>(<span style={{display:"inline-block",fontFamily:T.mono,fontSize:9,fontWeight:700,letterSpacing:"0.06em",textTransform:"uppercase",color:green?"#000":T.textSecondary,background:green?T.green:T.greenDark,border:green?"none":`0.5px solid ${T.borderCard}`,borderRadius:4,padding:"3px 8px",whiteSpace:"nowrap"}}>{children}</span>);
const NearBadge=()=>(<span style={{fontFamily:T.mono,fontSize:9,fontWeight:700,color:"#000",background:T.green,borderRadius:4,padding:"2px 8px",whiteSpace:"nowrap",flexShrink:0}}>◈ NEAR</span>);
const ProofStat=({number,label})=>(<div style={{background:T.bgCard,border:`0.5px solid ${T.borderCard}`,borderRadius:8,padding:"14px 12px",textAlign:"center"}}><div style={{fontFamily:T.display,fontSize:24,fontWeight:700,color:T.green,lineHeight:1,marginBottom:5}}>{number}</div><div style={{fontFamily:T.mono,fontSize:8,letterSpacing:"0.08em",textTransform:"uppercase",color:T.textDim,lineHeight:1.5}}>{label}</div></div>);
const Avatar=({url,name,size=28})=>{const[e,setE]=useState(false);return(!url||e)?<div style={{width:size,height:size,borderRadius:"50%",background:T.bgSurface,border:`0.5px solid ${T.borderCard}`,display:"flex",alignItems:"center",justifyContent:"center",color:T.green,fontSize:10,fontFamily:T.mono,fontWeight:700,flexShrink:0}}>{(name||"?")[0].toUpperCase()}</div>:<img src={url} alt={name} width={size} height={size} style={{borderRadius:"50%",objectFit:"cover",flexShrink:0,border:`0.5px solid ${T.borderCard}`}} onError={()=>setE(true)}/>;};
const Chip=({label,active,onClick,count})=>(<button onClick={onClick} style={{fontFamily:T.mono,fontSize:9,fontWeight:700,letterSpacing:"0.07em",textTransform:"uppercase",background:active?T.greenDark:"transparent",border:`0.5px solid ${active?T.green:T.borderNeutral}`,borderRadius:4,padding:"5px 12px",cursor:"pointer",color:active?T.green:T.textMuted,transition:"all 0.15s",whiteSpace:"nowrap",display:"inline-flex",alignItems:"center",gap:5}}>{label}{count!=null&&<span style={{opacity:0.6,fontSize:8}}>({count})</span>}</button>);
const PlusRow=()=>(<div style={{display:"flex",justifyContent:"space-between",padding:"5px 0",fontFamily:T.mono,fontSize:10,color:T.green,opacity:0.25,marginBottom:24}}>{Array.from({length:18},(_,i)=><span key={i}>+</span>)}</div>);
const BetNum=({n,label})=>(<div style={{textAlign:"right",flexShrink:0}}><div style={{fontFamily:T.display,fontSize:56,fontWeight:800,color:T.green,lineHeight:1}}>{n}</div><div style={{fontFamily:T.mono,fontSize:9,color:T.textMuted,letterSpacing:"0.1em",textTransform:"uppercase",marginTop:3}}>{label}</div></div>);
const NearLogo=()=>(<svg width="26" height="26" viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="5" fill={T.green}/><path d="M9 22V10l5 7.5V10M23 10v12l-5-7.5V22" stroke="#000" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round"/></svg>);
const PL=({children})=>(<div style={{fontFamily:T.mono,fontSize:10,fontWeight:700,letterSpacing:"0.14em",textTransform:"uppercase",color:T.green,marginBottom:10,display:"flex",alignItems:"center",gap:8}}><div style={{width:5,height:14,background:T.green,borderRadius:1,flexShrink:0}}/>{children}</div>);
const TH=({c,className=""})=><th className={className} style={{textAlign:"left",padding:"9px 14px",color:T.textDim,fontFamily:T.mono,fontSize:9,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",borderBottom:`0.5px solid ${T.borderCard}`,whiteSpace:"nowrap"}}>{c}</th>;
const TD=({children,s={},className=""})=><td className={className} style={{padding:"10px 14px",borderBottom:`0.5px solid ${T.borderSubtle}`,verticalAlign:"middle",...s}}>{children}</td>;

const NAV=[{id:"Overview",num:"01"},{id:"KOL Intel",num:"02"},{id:"Fund Intel",num:"03"},{id:"NEAR Tweets",num:"04"},{id:"Cross-Map",num:"05"},{id:"Strategy",num:"06"}];

export default function App(){
  const[nav,setNav]=useState("Overview");
  const[search,setSrch]=useState("");
  const[kolTier,setKT]=useState("All");
  const[kolTagSel,setKTS]=useState(()=>new Set());     // multi-select tag chips
  const[kolTypeSel,setKTyS]=useState(()=>new Set());   // multi-select type chips
  const[kolSort,setKS]=useState("NEAR Mentions");
  const[kolNearMin,setKNM]=useState(0);
  const[kolScoreMin,setKSM]=useState(0);
  const[fundCats,setFCs]=useState(()=>new Set());
  const[fundSort,setFS]=useState("Score");
  const[fundEngMin,setFEM]=useState(0);
  const[fundActive,setFA]=useState("All");
  const[nearOnly,setNO]=useState(false);
  const[tweetSort,setTS]=useState("Date");
  const[tweetMinLikes,setTML]=useState(0);
  const[isMobile,setIsMobile]=useState(false);
  useEffect(()=>{const check=()=>setIsMobile(window.innerWidth<=768);check();window.addEventListener('resize',check);return()=>window.removeEventListener('resize',check);},[]);

  const toggleSet=(s,setter,v)=>{const n=new Set(s);n.has(v)?n.delete(v):n.add(v);setter(n);};
  const clearKOL=()=>{setKT("All");setKTS(new Set());setKTyS(new Set());setKNM(0);setKSM(0);setNO(false);setSrch("");};
  const clearFund=()=>{setFCs(new Set());setFEM(0);setFA("All");setNO(false);setSrch("");};

  const allTags=useMemo(()=>{const s=new Set();KOLS.forEach(k=>k.Tags.forEach(t=>s.add(t)));return Array.from(s).sort();},[]);
  const allTypes=useMemo(()=>{const s=new Set();KOLS.forEach(k=>{if(k.Type)s.add(k.Type);});return Array.from(s).sort();},[]);
  const fundTags=useMemo(()=>{const s=new Set();FUNDS.forEach(f=>f.tags.forEach(t=>s.add(t)));return["All",...Array.from(s).sort()];},[]);

  const fKOLs=useMemo(()=>{
    let d=KOLS;
    if(search){const q=search.toLowerCase();d=d.filter(k=>(k["Display Name"]||"").toLowerCase().includes(q)||k.Handle.toLowerCase().includes(q)||(k.Description||"").toLowerCase().includes(q));}
    if(kolTier!=="All")d=d.filter(k=>k.tier===kolTier);
    if(kolTagSel.size>0)d=d.filter(k=>k.Tags.some(t=>kolTagSel.has(t)));
    if(kolTypeSel.size>0)d=d.filter(k=>kolTypeSel.has(k.Type));
    if(kolNearMin>0)d=d.filter(k=>(k["NEAR Mentions"]||0)>=kolNearMin);
    if(kolScoreMin>0)d=d.filter(k=>k.Score>=kolScoreMin);
    if(nearOnly)d=d.filter(k=>k.nearAligned);
    return[...d].sort((a,b)=>kolSort==="Score"?b.Score-a.Score:kolSort==="Followers"?b.Followers-a.Followers:kolSort==="Total Likes"?(b["Total Likes"]||0)-(a["Total Likes"]||0):(b["NEAR Mentions"]||0)-(a["NEAR Mentions"]||0));
  },[search,kolTier,kolTagSel,kolTypeSel,kolNearMin,kolScoreMin,nearOnly,kolSort]);

  const fFunds=useMemo(()=>{
    let d=FUNDS;
    if(search){const q=search.toLowerCase();d=d.filter(f=>(f["Display Name"]||"").toLowerCase().includes(q)||(f.Fund||"").toLowerCase().includes(q)||(f.Description||"").toLowerCase().includes(q));}
    if(fundCats.size>0)d=d.filter(f=>f.tags.some(t=>fundCats.has(t)));
    if(fundEngMin>0)d=d.filter(f=>(Number(f["Engagement Rate"]||0)*100)>=fundEngMin);
    if(fundActive==="Active")d=d.filter(f=>(f.Tweets||0)>=50);
    if(fundActive==="Quiet")d=d.filter(f=>(f.Tweets||0)<10);
    if(nearOnly)d=d.filter(f=>f.nearAligned);
    return[...d].sort((a,b)=>fundSort==="Score"?b.Score-a.Score:fundSort==="Followers"?b.Followers-a.Followers:(b["Engagement Rate"]||0)-(a["Engagement Rate"]||0));
  },[search,fundCats,fundEngMin,fundActive,nearOnly,fundSort]);

  const fTweets=useMemo(()=>{
    let d=RAW_TWEETS;
    if(search){const q=search.toLowerCase();d=d.filter(t=>t.Tweet.toLowerCase().includes(q)||t.Handle.toLowerCase().includes(q));}
    if(tweetMinLikes>0)d=d.filter(t=>(t.Likes||0)>=tweetMinLikes);
    return[...d].sort((a,b)=>tweetSort==="Likes"?(b.Likes||0)-(a.Likes||0):tweetSort==="Impressions"?(b.Impressions||0)-(a.Impressions||0):b.Date.localeCompare(a.Date));
  },[search,tweetSort,tweetMinLikes]);

  const nearKOLs=useMemo(()=>KOLS.filter(k=>k.nearAligned).sort((a,b)=>(b["NEAR Mentions"]||0)-(a["NEAR Mentions"]||0)),[]);
  const nearFunds=useMemo(()=>FUNDS.filter(f=>f.nearAligned),[]);
  const tierDist=useMemo(()=>{const m={Mega:0,Large:0,Mid:0,Micro:0};KOLS.forEach(k=>m[k.tier]++);return Object.entries(m).map(([name,value])=>({name,value}));},[]);
  const tagDist=useMemo(()=>{const m={};KOLS.forEach(k=>k.Tags.forEach(t=>{m[t]=(m[t]||0)+1;}));return Object.entries(m).sort((a,b)=>b[1]-a[1]).slice(0,10).map(([name,value])=>({name,value}));},[]);
  const typeDist=useMemo(()=>{const m={};KOLS.forEach(k=>{if(k.Type){m[k.Type]=(m[k.Type]||0)+1;}});return Object.entries(m).sort((a,b)=>b[1]-a[1]).map(([name,value])=>({name,value}));},[]);
  const fundTagDist=useMemo(()=>{const m={};FUNDS.forEach(f=>f.tags.forEach(t=>{m[t]=(m[t]||0)+1;}));return Object.entries(m).sort((a,b)=>b[1]-a[1]).slice(0,8).map(([name,value])=>({name,value}));},[]);
  const exportCSV=useCallback((data,fn)=>{if(!data.length)return;const keys=Object.keys(data[0]);const rows=[keys.join(","),...data.map(r=>keys.map(k=>JSON.stringify(r[k]??'')).join(","))];const b=new Blob([rows.join("\n")],{type:"text/csv"});const a=document.createElement("a");a.href=URL.createObjectURL(b);a.download=fn;a.click();},[]);

  const tt={background:T.bgCard,border:`0.5px solid ${T.borderCard}`,borderRadius:4,fontFamily:T.mono,fontSize:10,color:T.textPrimary};

  return(<>
    <FL/>
    <style>{`*{box-sizing:border-box;margin:0;padding:0;}body{background:${T.bgBase};overflow-x:hidden;}::-webkit-scrollbar{width:3px;height:3px;}::-webkit-scrollbar-track{background:${T.bgBase};}::-webkit-scrollbar-thumb{background:${T.borderCard};border-radius:2px;}::-webkit-scrollbar-thumb:hover{background:${T.green};}tr.rh:hover td{background:${T.bgSurface};}button{cursor:pointer;}button:hover{opacity:0.85;}@media(max-width:768px){.col-type,.col-tags,.col-likes,.col-role,.col-categories{display:none!important;}.nav-buttons{overflow-x:auto;-webkit-overflow-scrolling:touch;scrollbar-width:none;}.nav-buttons::-webkit-scrollbar{display:none;}.search-row{display:none!important;}}`}</style>
    <div style={{minHeight:"100vh",background:T.bgBase,color:T.textPrimary,fontFamily:T.display}}>

      {/* NAV */}
      <div style={{background:T.bgSurface,borderBottom:`0.5px solid ${T.borderCard}`,position:"sticky",top:0,zIndex:100}}>
        <div style={{display:"flex",justifyContent:"space-between",padding:isMobile?"4px 12px":"4px 40px",fontFamily:T.mono,fontSize:10,color:T.green,opacity:0.2,borderBottom:`0.5px solid ${T.borderSubtle}`}}>{Array.from({length:isMobile?8:20},(_,i)=><span key={i}>+</span>)}</div>
        <div style={{display:"flex",alignItems:"stretch",padding:isMobile?"0 8px":"0 40px",height:52,overflow:"hidden"}}>
          <div style={{display:"flex",alignItems:"center",gap:12,paddingRight:isMobile?12:28,marginRight:4,borderRight:`0.5px solid ${T.borderCard}`,flexShrink:0}}>
            <NearLogo/>
            <div style={{display:isMobile?"none":"block"}}>
              <div style={{fontFamily:T.display,fontSize:13,fontWeight:800,color:T.textPrimary,letterSpacing:"0.04em",lineHeight:1}}>NEAR INTELLIGENCE</div>
              <div style={{fontFamily:T.mono,fontSize:8,color:T.textDim,letterSpacing:"0.12em",textTransform:"uppercase",marginTop:3}}>ECOSYSTEM · KOL + FUND + TWEET PLATFORM</div>
            </div>
          </div>
          <div className="nav-buttons" style={{display:"flex",alignItems:"stretch",flex:1}}>
            {NAV.map(({id,num})=>(<button key={id} onClick={()=>setNav(id)} style={{display:"flex",alignItems:"center",gap:7,padding:"0 14px",background:nav===id?T.bgCard:"transparent",borderTop:"none",borderRight:"none",borderBottom:"none",borderLeft:`2px solid ${nav===id?T.green:"transparent"}`,outline:"none",transition:"all 0.15s",flexShrink:0}}><span style={{fontFamily:T.mono,fontSize:9,color:nav===id?T.green:T.textDim,fontWeight:700}}>{num}</span><span style={{fontFamily:T.mono,fontSize:10,fontWeight:700,letterSpacing:"0.07em",textTransform:"uppercase",color:nav===id?T.green:T.textMuted,whiteSpace:"nowrap"}}>{id}</span></button>))}
          </div>
          <div className="search-row" style={{display:"flex",alignItems:"center",gap:8,flexShrink:0}}>
            <input value={search} onChange={e=>setSrch(e.target.value)} placeholder="SEARCH..." style={{background:T.bgCard,border:`0.5px solid ${T.borderCard}`,borderRadius:4,padding:"6px 14px",color:T.textPrimary,fontSize:10,fontFamily:T.mono,letterSpacing:"0.06em",outline:"none",width:180}}/>
            <button onClick={()=>setNO(!nearOnly)} style={{fontFamily:T.mono,fontSize:9,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",background:nearOnly?T.greenDark:"transparent",border:`0.5px solid ${nearOnly?T.green:T.borderCard}`,borderRadius:4,padding:"6px 14px",color:nearOnly?T.green:T.textMuted,transition:"all 0.15s"}}>◈ NEAR ONLY</button>
          </div>
        </div>
      </div>

      {isMobile&&<div style={{padding:"8px 12px",background:T.bgSurface,borderBottom:`0.5px solid ${T.borderCard}`,display:"flex",gap:8}}>
        <input value={search} onChange={e=>setSrch(e.target.value)} placeholder="SEARCH..." style={{flex:1,background:T.bgCard,border:`0.5px solid ${T.borderCard}`,borderRadius:4,padding:"8px 12px",color:T.textPrimary,fontSize:11,fontFamily:T.mono,letterSpacing:"0.06em",outline:"none"}}/>
        <button onClick={()=>setNO(!nearOnly)} style={{fontFamily:T.mono,fontSize:9,fontWeight:700,letterSpacing:"0.06em",textTransform:"uppercase",background:nearOnly?T.greenDark:"transparent",border:`0.5px solid ${nearOnly?T.green:T.borderCard}`,borderRadius:4,padding:"8px 10px",color:nearOnly?T.green:T.textMuted,flexShrink:0}}>◈</button>
      </div>}
      <div style={{padding:isMobile?"20px 12px":"32px 40px",maxWidth:1480,margin:"0 auto"}}>

        {/* OVERVIEW */}
        {nav==="Overview"&&<>
          <PlusRow/>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:32}}>
            <div>
              <PL>NEAR Protocol · Ecosystem Intelligence</PL>
              <div style={{fontFamily:T.display,fontSize:isMobile?28:44,fontWeight:800,color:T.textPrimary,letterSpacing:"-0.025em",lineHeight:1.05,marginBottom:12}}>KOL + Fund Manager<br/>Intelligence Platform</div>
              <div style={{fontFamily:T.display,fontSize:13,color:T.textMuted,lineHeight:1.65,maxWidth:520}}>Operator-grade intelligence — {KOLS.length} Trader KOLs, {FUNDS.length} Fund Managers, {RAW_TWEETS.length} live NEAR-tagged tweets.</div>
            </div>
            <BetNum n="01" label="Overview"/>
          </div>
          <div style={{display:"grid",gridTemplateColumns:isMobile?"repeat(2,1fr)":"repeat(6,1fr)",gap:10,marginBottom:16}}>
            <ProofStat number={KOLS.length} label="Total KOLs"/>
            <ProofStat number={nearKOLs.length} label="◈ NEAR-Active KOLs"/>
            <ProofStat number={FUNDS.length} label="Fund Managers"/>
            <ProofStat number={RAW_TWEETS.length} label="NEAR Tweets"/>
            <ProofStat number={fmt(KOLS.reduce((a,k)=>a+k.Followers,0))} label="Total KOL Reach"/>
            <ProofStat number={fmt(RAW_TWEETS.reduce((a,t)=>a+(t.Impressions||0),0))} label="Tweet Impressions"/>
          </div>
          <div style={{display:"grid",gridTemplateColumns:isMobile?"1fr":"0.75fr 1.3fr 1.3fr",gap:10,marginBottom:10}}>
            <Card><SL>KOL Tier Split</SL><ResponsiveContainer width="100%" height={170}><PieChart><Pie data={tierDist} dataKey="value" cx="50%" cy="50%" outerRadius={66} label={({name,value})=>`${name}:${value}`} labelLine={false} fontSize={8} fontFamily={T.mono}>{tierDist.map((e,i)=><Cell key={i} fill={Object.values(TIER_C)[i]}/>)}</Pie><Tooltip contentStyle={tt}/></PieChart></ResponsiveContainer></Card>
            <Card><SL>Tag Distribution</SL><ResponsiveContainer width="100%" height={170}><BarChart data={tagDist} margin={{top:4,right:4,bottom:32,left:-24}}><XAxis dataKey="name" tick={{fill:T.textDim,fontSize:8,fontFamily:T.mono}} angle={-35} textAnchor="end" interval={0}/><YAxis tick={{fill:T.textDim,fontSize:8,fontFamily:T.mono}}/><Tooltip contentStyle={tt}/><Bar dataKey="value" fill={T.green} radius={[2,2,0,0]}/></BarChart></ResponsiveContainer></Card>
            <Card><SL>KOL Type Distribution</SL><ResponsiveContainer width="100%" height={170}><BarChart data={typeDist} margin={{top:4,right:4,bottom:40,left:-24}}><XAxis dataKey="name" tick={{fill:T.textDim,fontSize:8,fontFamily:T.mono}} angle={-35} textAnchor="end" interval={0}/><YAxis tick={{fill:T.textDim,fontSize:8,fontFamily:T.mono}}/><Tooltip contentStyle={tt}/><Bar dataKey="value" fill={T.green} radius={[2,2,0,0]}/></BarChart></ResponsiveContainer></Card>
          </div>
          <div style={{display:"grid",gridTemplateColumns:isMobile?"1fr":"1fr 1fr 1fr",gap:10}}>
            <Card><SL>◈ Top NEAR Mentioners</SL>{nearKOLs.slice(0,8).map(k=>(<div key={k.Handle} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 0",borderBottom:`0.5px solid ${T.borderSubtle}`}}><Avatar url={k.profile_picture_url} name={k["Display Name"]||k.Handle}/><div style={{flex:1,minWidth:0}}><div style={{fontFamily:T.display,fontSize:12,fontWeight:600,color:T.textPrimary,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{k["Display Name"]||k.Handle}</div><div style={{fontFamily:T.mono,fontSize:8,color:T.textDim}}>@{k.Handle}</div></div><div style={{textAlign:"right",flexShrink:0}}><div style={{fontFamily:T.mono,fontSize:13,fontWeight:700,color:T.green,lineHeight:1}}>{k["NEAR Mentions"]}◈</div><div style={{fontFamily:T.mono,fontSize:8,color:T.textDim}}>{fmt(k.Followers)}</div></div></div>))}</Card>
            <Card><SL>Top by Score</SL>{[...KOLS].sort((a,b)=>b.Score-a.Score).slice(0,8).map((k,i)=>(<div key={k.Handle} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 0",borderBottom:`0.5px solid ${T.borderSubtle}`}}><div style={{fontFamily:T.mono,fontSize:9,color:T.textDim,width:16,flexShrink:0}}>#{i+1}</div><Avatar url={k.profile_picture_url} name={k["Display Name"]||k.Handle}/><div style={{flex:1,minWidth:0}}><div style={{fontFamily:T.display,fontSize:12,fontWeight:600,color:T.textPrimary,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{k["Display Name"]||k.Handle}</div><div style={{fontFamily:T.mono,fontSize:8,fontWeight:700,textTransform:"uppercase",color:TIER_C[k.tier]}}>{k.tier}</div></div><div style={{fontFamily:T.display,fontSize:20,fontWeight:700,color:T.green,flexShrink:0}}>{k.Score.toFixed(0)}</div></div>))}</Card>
            <Card><SL>Top Funds by Score</SL>{FUNDS.slice(0,8).map((f,i)=>(<div key={f.Handle+i} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 0",borderBottom:`0.5px solid ${T.borderSubtle}`}}><div style={{fontFamily:T.mono,fontSize:9,color:T.textDim,width:16,flexShrink:0}}>#{i+1}</div><Avatar url={f.profile_picture_url} name={f["Display Name"]}/><div style={{flex:1,minWidth:0}}><div style={{fontFamily:T.display,fontSize:12,fontWeight:600,color:T.textPrimary,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{f["Display Name"]}</div><div style={{fontFamily:T.mono,fontSize:8,color:T.textDim,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{f.Fund}</div></div><div style={{fontFamily:T.display,fontSize:20,fontWeight:700,color:T.green,flexShrink:0}}>{(f.Score*100).toFixed(0)}</div></div>))}</Card>
          </div>
        </>}

        {/* KOL INTEL */}
        {nav==="KOL Intel"&&<>
          <PlusRow/>
          <div style={{display:"flex",alignItems:"flex-end",justifyContent:"space-between",marginBottom:24}}>
            <div><PL>Trader KOL Intelligence</PL><div style={{fontFamily:T.display,fontSize:isMobile?24:36,fontWeight:800,color:T.textPrimary,letterSpacing:"-0.02em"}}>{fKOLs.length} KOLs</div></div>
            <div style={{display:"flex",alignItems:"center",gap:16}}><button onClick={()=>exportCSV(fKOLs,"near_kols.csv")} style={{fontFamily:T.mono,fontSize:9,fontWeight:700,letterSpacing:"0.09em",textTransform:"uppercase",background:"transparent",border:`0.5px solid ${T.green}`,borderRadius:4,padding:"8px 18px",color:T.green}}>↓ EXPORT CSV</button><BetNum n="02" label="KOL Intel"/></div>
          </div>
          <Card style={{marginBottom:10}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
              <div style={{fontFamily:T.mono,fontSize:10,fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase",color:T.green}}>◢ FILTER STACK</div>
              <button onClick={clearKOL} style={{fontFamily:T.mono,fontSize:8,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",background:"transparent",border:`0.5px solid ${T.borderNeutral}`,borderRadius:4,padding:"4px 10px",color:T.textMuted}}>× CLEAR ALL</button>
            </div>
            <div style={{marginBottom:14}}><div style={{fontFamily:T.mono,fontSize:9,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:T.textDim,marginBottom:8}}>TIER</div><div style={{display:"flex",gap:6,flexWrap:"wrap"}}>{["All","Mega","Large","Mid","Micro"].map(t=>(<Chip key={t} label={t} active={kolTier===t} onClick={()=>setKT(t)} count={t!=="All"?KOLS.filter(k=>k.tier===t).length:null}/>))}</div></div>
            <div style={{marginBottom:14}}><div style={{fontFamily:T.mono,fontSize:9,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:T.textDim,marginBottom:8}}>KOL TYPE · MULTI-SELECT {kolTypeSel.size>0&&<span style={{color:T.green,marginLeft:6}}>({kolTypeSel.size})</span>}</div><div style={{display:"flex",gap:6,flexWrap:"wrap"}}>{allTypes.map(t=><Chip key={t} label={t} active={kolTypeSel.has(t)} onClick={()=>toggleSet(kolTypeSel,setKTyS,t)} count={KOLS.filter(k=>k.Type===t).length}/>)}</div></div>
            <div style={{marginBottom:14}}><div style={{fontFamily:T.mono,fontSize:9,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:T.textDim,marginBottom:8}}>TAGS · MULTI-SELECT {kolTagSel.size>0&&<span style={{color:T.green,marginLeft:6}}>({kolTagSel.size})</span>}</div><div style={{display:"flex",gap:6,flexWrap:"wrap"}}>{allTags.map(t=><Chip key={t} label={t} active={kolTagSel.has(t)} onClick={()=>toggleSet(kolTagSel,setKTS,t)} count={KOLS.filter(k=>k.Tags.includes(t)).length}/>)}</div></div>
            <div style={{display:"grid",gridTemplateColumns:isMobile?"1fr":"1fr 1fr",gap:16,marginBottom:14}}>
              <div><div style={{fontFamily:T.mono,fontSize:9,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:T.textDim,marginBottom:8}}>◈ NEAR MENTIONS</div><div style={{display:"flex",gap:6,flexWrap:"wrap"}}>{[[0,"ANY"],[1,"1+"],[3,"3+"],[5,"5+"],[10,"10+"],[25,"25+"]].map(([v,l])=><Chip key={v} label={l} active={kolNearMin===v} onClick={()=>setKNM(v)}/>)}</div></div>
              <div><div style={{fontFamily:T.mono,fontSize:9,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:T.textDim,marginBottom:8}}>SCORE FLOOR</div><div style={{display:"flex",gap:6,flexWrap:"wrap"}}>{[[0,"ANY"],[30,"30+"],[40,"40+"],[50,"50+"],[60,"60+"],[70,"70+"]].map(([v,l])=><Chip key={v} label={l} active={kolScoreMin===v} onClick={()=>setKSM(v)}/>)}</div></div>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:10,borderTop:`0.5px solid ${T.borderCard}`,paddingTop:12,flexWrap:"wrap"}}>
              <div style={{fontFamily:T.mono,fontSize:9,color:T.textDim,textTransform:"uppercase",letterSpacing:"0.08em"}}>SORT</div>
              <div style={{display:"flex",gap:6}}>{["Score","Followers","NEAR Mentions","Total Likes"].map(o=><Chip key={o} label={o} active={kolSort===o} onClick={()=>setKS(o)}/>)}</div>
              <div style={{marginLeft:"auto",display:"flex",gap:isMobile?12:24,flexWrap:"wrap",justifyContent:"flex-end"}}>
                {[[fKOLs.length,"SHOWING"],[fKOLs.filter(k=>k.nearAligned).length,"◈ NEAR"],[fKOLs.filter(k=>["Mega","Large"].includes(k.tier)).length,"MEGA/LARGE"],[fmt(fKOLs.reduce((a,k)=>a+k.Followers,0)),"REACH"]].map(([v,l])=>(<div key={l} style={{textAlign:"right"}}><div style={{fontFamily:T.display,fontSize:22,fontWeight:700,color:T.green,lineHeight:1}}>{v}</div><div style={{fontFamily:T.mono,fontSize:8,color:T.textDim,letterSpacing:"0.08em",textTransform:"uppercase",marginTop:2}}>{l}</div></div>))}
              </div>
            </div>
          </Card>
          <Card style={isMobile?{padding:"8px 14px 8px 6px"}:{}}>
            {isMobile?(
              <div>
                {fKOLs.map((k,i)=>(
                  <div key={k.Handle+i} style={{display:"flex",alignItems:"center",gap:8,padding:"10px 0",borderBottom:`0.5px solid ${T.borderSubtle}`}}>
                    <div style={{fontFamily:T.mono,fontSize:11,color:T.textDim,width:16,flexShrink:0,textAlign:"right",lineHeight:1}}>{i+1}</div>
                    <Avatar url={k.profile_picture_url} name={k["Display Name"]||k.Handle}/>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:3}}>
                        <div style={{fontFamily:T.display,fontSize:13,fontWeight:600,color:T.textPrimary,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{k["Display Name"]||k.Handle}</div>
                        {k.nearAligned&&<NearBadge/>}
                      </div>
                      <div style={{display:"flex",alignItems:"center",gap:8}}>
                        <a href={`https://twitter.com/${k.Handle}`} target="_blank" rel="noreferrer" style={{fontFamily:T.mono,fontSize:8,color:T.green,textDecoration:"none"}}>@{k.Handle}</a>
                        <span style={{display:"inline-flex",alignItems:"center",gap:3,fontFamily:T.mono,fontSize:8,fontWeight:700,color:TIER_C[k.tier]}}><span style={{width:5,height:5,borderRadius:"50%",background:TIER_C[k.tier],display:"inline-block",flexShrink:0}}/>{k.tier}</span>
                        <span style={{fontFamily:T.mono,fontSize:8,color:T.textDim}}>{fmt(k.Followers)}</span>
                      </div>
                    </div>
                    <div style={{flexShrink:0,textAlign:"right"}}>
                      <div style={{fontFamily:T.display,fontSize:20,fontWeight:700,color:T.green,lineHeight:1}}>{k.Score.toFixed(0)}</div>
                      {(k["NEAR Mentions"]||0)>0&&<div style={{fontFamily:T.mono,fontSize:8,color:T.green,marginTop:2}}>{k["NEAR Mentions"]}◈</div>}
                    </div>
                  </div>
                ))}
              </div>
            ):(
              <table style={{width:"100%",borderCollapse:"collapse"}}>
                <thead><tr><TH c="#"/><TH c="ACCOUNT"/><TH c="TIER"/><TH c="TYPE" className="col-type"/><TH c="TAGS" className="col-tags"/><TH c="FOLLOWERS"/><TH c="◈ NEAR"/><TH c="LIKES" className="col-likes"/><TH c="SCORE"/></tr></thead>
                <tbody>{fKOLs.map((k,i)=>(<tr key={k.Handle+i} className="rh">
                  <TD s={{color:T.textDim,fontFamily:T.mono,fontSize:9,width:28}}>{i+1}</TD>
                  <TD><div style={{display:"flex",alignItems:"center",gap:10}}><Avatar url={k.profile_picture_url} name={k["Display Name"]||k.Handle}/><div><div style={{fontFamily:T.display,fontSize:13,fontWeight:600,color:T.textPrimary}}>{k["Display Name"]||k.Handle}</div><a href={`https://twitter.com/${k.Handle}`} target="_blank" rel="noreferrer" style={{fontFamily:T.mono,fontSize:8,color:T.green,textDecoration:"none",letterSpacing:"0.05em"}}>@{k.Handle}</a></div>{k.nearAligned&&<NearBadge/>}</div></TD>
                  <TD><span style={{fontFamily:T.mono,fontSize:9,fontWeight:700,letterSpacing:"0.05em",textTransform:"uppercase",color:TIER_C[k.tier]}}><span style={{display:"inline-block",width:6,height:6,borderRadius:"50%",background:TIER_C[k.tier],marginRight:5,verticalAlign:"middle"}}/>{k.tier}</span></TD>
                  <TD className="col-type" s={{fontFamily:T.mono,fontSize:10,color:T.textSecondary,maxWidth:140}}>{k.Type||"—"}</TD>
                  <TD className="col-tags"><div style={{display:"flex",gap:4,flexWrap:"wrap"}}>{k.Tags.slice(0,3).map(t=><Tag key={t}>{t}</Tag>)}</div></TD>
                  <TD s={{fontFamily:T.mono,fontSize:13,color:T.textPrimary,fontWeight:700}}>{fmt(k.Followers)}</TD>
                  <TD s={{fontFamily:T.mono,fontSize:14,fontWeight:700,color:(k["NEAR Mentions"]||0)>0?T.green:T.textDim}}>{(k["NEAR Mentions"]||0)>0?k["NEAR Mentions"]:"—"}</TD>
                  <TD className="col-likes" s={{fontFamily:T.mono,fontSize:11,color:T.textMuted}}>{fmt(k["Total Likes"]||0)}</TD>
                  <TD s={{fontFamily:T.display,fontSize:20,fontWeight:700,color:T.green}}>{k.Score.toFixed(0)}</TD>
                </tr>))}</tbody>
              </table>
            )}
          </Card>
        </>}

        {/* FUND INTEL */}
        {nav==="Fund Intel"&&<>
          <PlusRow/>
          <div style={{display:"flex",alignItems:"flex-end",justifyContent:"space-between",marginBottom:24}}>
            <div><PL>Fund Manager Intelligence</PL><div style={{fontFamily:T.display,fontSize:isMobile?24:36,fontWeight:800,color:T.textPrimary,letterSpacing:"-0.02em"}}>{fFunds.length} Fund Managers</div></div>
            <div style={{display:"flex",alignItems:"center",gap:16}}><button onClick={()=>exportCSV(fFunds,"near_funds.csv")} style={{fontFamily:T.mono,fontSize:9,fontWeight:700,letterSpacing:"0.09em",textTransform:"uppercase",background:"transparent",border:`0.5px solid ${T.green}`,borderRadius:4,padding:"8px 18px",color:T.green}}>↓ EXPORT CSV</button><BetNum n="03" label="Fund Intel"/></div>
          </div>
          <Card style={{marginBottom:10}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
              <div style={{fontFamily:T.mono,fontSize:10,fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase",color:T.green}}>◢ FILTER STACK</div>
              <button onClick={clearFund} style={{fontFamily:T.mono,fontSize:8,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",background:"transparent",border:`0.5px solid ${T.borderNeutral}`,borderRadius:4,padding:"4px 10px",color:T.textMuted}}>× CLEAR ALL</button>
            </div>
            <div style={{marginBottom:14}}><div style={{fontFamily:T.mono,fontSize:9,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:T.textDim,marginBottom:8}}>FUND CATEGORY · MULTI-SELECT {fundCats.size>0&&<span style={{color:T.green,marginLeft:6}}>({fundCats.size})</span>}</div><div style={{display:"flex",flexWrap:"wrap",gap:6}}>{fundTags.filter(t=>t!=="All").map(t=><Chip key={t} label={t} active={fundCats.has(t)} onClick={()=>toggleSet(fundCats,setFCs,t)} count={FUNDS.filter(f=>f.tags.includes(t)).length}/>)}</div></div>
            <div style={{display:"grid",gridTemplateColumns:isMobile?"1fr":"1fr 1fr",gap:16,marginBottom:14}}>
              <div><div style={{fontFamily:T.mono,fontSize:9,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:T.textDim,marginBottom:8}}>ENGAGEMENT FLOOR</div><div style={{display:"flex",gap:6,flexWrap:"wrap"}}>{[[0,"ANY"],[10,"10%+"],[25,"25%+"],[50,"50%+"],[100,"100%+"]].map(([v,l])=><Chip key={v} label={l} active={fundEngMin===v} onClick={()=>setFEM(v)}/>)}</div></div>
              <div><div style={{fontFamily:T.mono,fontSize:9,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:T.textDim,marginBottom:8}}>ACTIVITY</div><div style={{display:"flex",gap:6,flexWrap:"wrap"}}>{["All","Active","Quiet"].map(t=><Chip key={t} label={t==="Active"?"50+ TWEETS":t==="Quiet"?"UNDER 10":t} active={fundActive===t} onClick={()=>setFA(t)}/>)}</div></div>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:10,borderTop:`0.5px solid ${T.borderCard}`,paddingTop:12,flexWrap:"wrap"}}>
              <div style={{fontFamily:T.mono,fontSize:9,color:T.textDim,textTransform:"uppercase",letterSpacing:"0.08em"}}>SORT</div>
              <div style={{display:"flex",gap:6}}>{["Score","Followers","Engagement Rate"].map(o=><Chip key={o} label={o} active={fundSort===o} onClick={()=>setFS(o)}/>)}</div>
              <div style={{marginLeft:"auto",display:"flex",gap:isMobile?12:24,flexWrap:"wrap",justifyContent:"flex-end"}}>
                {[[fFunds.length,"SHOWING"],[fFunds.filter(f=>f.nearAligned).length,"◈ NEAR"],[fFunds.filter(f=>f.tags.includes("Tier 1 VC")).length,"TIER 1 VCS"],[fmt(fFunds.reduce((a,f)=>a+(f.Followers||0),0)),"REACH"]].map(([v,l])=>(<div key={l} style={{textAlign:"right"}}><div style={{fontFamily:T.display,fontSize:22,fontWeight:700,color:T.green,lineHeight:1}}>{v}</div><div style={{fontFamily:T.mono,fontSize:8,color:T.textDim,letterSpacing:"0.08em",textTransform:"uppercase",marginTop:2}}>{l}</div></div>))}
              </div>
            </div>
          </Card>
          <Card style={isMobile?{padding:"8px 14px 8px 6px"}:{}}>
            {isMobile?(
              <div>
                {fFunds.map((f,i)=>(
                  <div key={f.Handle+i} style={{display:"flex",alignItems:"center",gap:8,padding:"10px 0",borderBottom:`0.5px solid ${T.borderSubtle}`}}>
                    <div style={{fontFamily:T.mono,fontSize:11,color:T.textDim,width:16,flexShrink:0,textAlign:"right",lineHeight:1}}>{i+1}</div>
                    <Avatar url={f.profile_picture_url} name={f["Display Name"]}/>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:3}}>
                        <div style={{fontFamily:T.display,fontSize:13,fontWeight:600,color:T.textPrimary,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{f["Display Name"]}</div>
                        {f.nearAligned&&<NearBadge/>}
                      </div>
                      <div style={{display:"flex",alignItems:"center",gap:8}}>
                        <a href={`https://twitter.com/${f.Handle}`} target="_blank" rel="noreferrer" style={{fontFamily:T.mono,fontSize:8,color:T.green,textDecoration:"none"}}>@{f.Handle}</a>
                        <span style={{fontFamily:T.mono,fontSize:8,color:T.textDim,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",maxWidth:100}}>{f.Fund||"—"}</span>
                      </div>
                    </div>
                    <div style={{flexShrink:0,textAlign:"right"}}>
                      <div style={{fontFamily:T.display,fontSize:20,fontWeight:700,color:T.green,lineHeight:1}}>{(Number(f.Score||0)*100).toFixed(0)}</div>
                      <div style={{fontFamily:T.mono,fontSize:8,color:T.textDim,marginTop:2}}>{(Number(f["Engagement Rate"]||0)*100).toFixed(1)}%</div>
                    </div>
                  </div>
                ))}
              </div>
            ):(
              <table style={{width:"100%",borderCollapse:"collapse"}}>
                <thead><tr><TH c="#"/><TH c="MANAGER"/><TH c="FUND"/><TH c="ROLE" className="col-role"/><TH c="CATEGORIES" className="col-categories"/><TH c="FOLLOWERS"/><TH c="ENGAGEMENT"/><TH c="SCORE"/></tr></thead>
                <tbody>{fFunds.map((f,i)=>(<tr key={f.Handle+i} className="rh">
                  <TD s={{color:T.textDim,fontFamily:T.mono,fontSize:9,width:28}}>{i+1}</TD>
                  <TD><div style={{display:"flex",alignItems:"center",gap:10}}><Avatar url={f.profile_picture_url} name={f["Display Name"]}/><div><div style={{fontFamily:T.display,fontSize:13,fontWeight:600,color:T.textPrimary}}>{f["Display Name"]}</div><a href={`https://twitter.com/${f.Handle}`} target="_blank" rel="noreferrer" style={{fontFamily:T.mono,fontSize:8,color:T.green,textDecoration:"none",letterSpacing:"0.05em"}}>@{f.Handle}</a></div>{f.nearAligned&&<NearBadge/>}</div></TD>
                  <TD s={{fontFamily:T.mono,fontSize:11,color:T.textPrimary}}>{f.Fund||"—"}</TD>
                  <TD className="col-role" s={{fontFamily:T.display,fontSize:11,color:T.textMuted,maxWidth:140}}>{f.Role||"—"}</TD>
                  <TD className="col-categories"><div style={{display:"flex",gap:4,flexWrap:"wrap"}}>{(f.tags||[]).slice(0,2).map(t=><Tag key={t}>{t}</Tag>)}</div></TD>
                  <TD s={{fontFamily:T.mono,fontSize:12,color:T.textPrimary,fontWeight:700}}>{fmt(f.Followers)}</TD>
                  <TD s={{fontFamily:T.mono,fontSize:13,color:T.green,fontWeight:700}}>{(Number(f["Engagement Rate"]||0)*100).toFixed(1)}%</TD>
                  <TD s={{fontFamily:T.display,fontSize:20,fontWeight:700,color:T.green}}>{(Number(f.Score||0)*100).toFixed(0)}</TD>
                </tr>))}</tbody>
              </table>
            )}
          </Card>
        </>}

        {/* NEAR TWEETS */}
        {nav==="NEAR Tweets"&&<>
          <PlusRow/>
          <div style={{display:"flex",alignItems:"flex-end",justifyContent:"space-between",marginBottom:24}}>
            <div><PL>NEAR Mention Stream</PL><div style={{fontFamily:T.display,fontSize:isMobile?24:36,fontWeight:800,color:T.textPrimary,letterSpacing:"-0.02em"}}>{fTweets.length} Tweets</div></div>
            <div style={{display:"flex",alignItems:"center",gap:16}}><button onClick={()=>exportCSV(fTweets,"near_tweets.csv")} style={{fontFamily:T.mono,fontSize:9,fontWeight:700,letterSpacing:"0.09em",textTransform:"uppercase",background:"transparent",border:`0.5px solid ${T.green}`,borderRadius:4,padding:"8px 18px",color:T.green}}>↓ EXPORT CSV</button><BetNum n="04" label="Tweets"/></div>
          </div>
          <Card style={{marginBottom:10}}>
            <div style={{display:"flex",alignItems:"center",gap:24,flexWrap:"wrap"}}>
              <div><div style={{fontFamily:T.mono,fontSize:9,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:T.textDim,marginBottom:8}}>SORT</div><div style={{display:"flex",gap:6}}>{["Date","Likes","Impressions"].map(o=><Chip key={o} label={o} active={tweetSort===o} onClick={()=>setTS(o)}/>)}</div></div>
              <div><div style={{fontFamily:T.mono,fontSize:9,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:T.textDim,marginBottom:8}}>MIN LIKES</div><div style={{display:"flex",gap:6}}>{[[0,"ANY"],[10,"10+"],[50,"50+"],[100,"100+"],[500,"500+"]].map(([v,l])=><Chip key={v} label={l} active={tweetMinLikes===v} onClick={()=>setTML(v)}/>)}</div></div>
              <div style={{marginLeft:"auto",display:"flex",gap:isMobile?12:24,flexWrap:"wrap",justifyContent:"flex-end"}}>
                {[[fTweets.length,"TWEETS"],[fmt(fTweets.reduce((a,t)=>a+(t.Likes||0),0)),"TOTAL LIKES"],[fmt(fTweets.reduce((a,t)=>a+(t.Impressions||0),0)),"IMPRESSIONS"]].map(([v,l])=>(<div key={l} style={{textAlign:"right"}}><div style={{fontFamily:T.display,fontSize:22,fontWeight:700,color:T.green,lineHeight:1}}>{v}</div><div style={{fontFamily:T.mono,fontSize:8,color:T.textDim,letterSpacing:"0.08em",textTransform:"uppercase",marginTop:2}}>{l}</div></div>))}
              </div>
            </div>
          </Card>
          <div style={{display:"grid",gridTemplateColumns:isMobile?"1fr":"1fr 1fr",gap:10}}>
            {fTweets.map((t,i)=>{const kol=KOLS.find(k=>k.Handle.toLowerCase()===t.Handle.toLowerCase());return(
              <Card key={i} style={{display:"flex",flexDirection:"column",gap:12,minHeight:160}}>
                <div style={{display:"flex",alignItems:"center",gap:10}}>
                  <Avatar url={kol?kol.profile_picture_url:""} name={t.Handle} size={32}/>
                  <div style={{flex:1,minWidth:0}}>
                    <a href={`https://twitter.com/${t.Handle}`} target="_blank" rel="noreferrer" style={{fontFamily:T.display,fontSize:13,fontWeight:600,color:T.textPrimary,textDecoration:"none"}}>@{t.Handle}</a>
                    <div style={{fontFamily:T.mono,fontSize:9,color:T.textDim}}>{t.Date}</div>
                  </div>
                  <a href={t.URL} target="_blank" rel="noreferrer" style={{fontFamily:T.mono,fontSize:9,color:T.green,textDecoration:"none",letterSpacing:"0.06em",textTransform:"uppercase"}}>VIEW →</a>
                </div>
                <div style={{fontFamily:T.display,fontSize:12,color:T.textSecondary,lineHeight:1.55,flex:1}}>{t.Tweet}</div>
                <div style={{display:"flex",gap:16,borderTop:`0.5px solid ${T.borderSubtle}`,paddingTop:10}}>
                  <div><span style={{fontFamily:T.mono,fontSize:11,fontWeight:700,color:T.green}}>{fmt(t.Likes)}</span> <span style={{fontFamily:T.mono,fontSize:8,color:T.textDim,letterSpacing:"0.08em",textTransform:"uppercase"}}>LIKES</span></div>
                  <div><span style={{fontFamily:T.mono,fontSize:11,fontWeight:700,color:T.green}}>{fmt(t.Retweets)}</span> <span style={{fontFamily:T.mono,fontSize:8,color:T.textDim,letterSpacing:"0.08em",textTransform:"uppercase"}}>RT</span></div>
                  <div><span style={{fontFamily:T.mono,fontSize:11,fontWeight:700,color:T.green}}>{fmt(t.Replies)}</span> <span style={{fontFamily:T.mono,fontSize:8,color:T.textDim,letterSpacing:"0.08em",textTransform:"uppercase"}}>REPLIES</span></div>
                  <div style={{marginLeft:"auto"}}><span style={{fontFamily:T.mono,fontSize:11,fontWeight:700,color:T.green}}>{fmt(t.Impressions)}</span> <span style={{fontFamily:T.mono,fontSize:8,color:T.textDim,letterSpacing:"0.08em",textTransform:"uppercase"}}>IMP</span></div>
                </div>
              </Card>
            );})}
          </div>
        </>}

        {/* CROSS-MAP */}
        {nav==="Cross-Map"&&<>
          <PlusRow/>
          <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:24}}>
            <div><PL>Cross-Ecosystem Intelligence</PL><div style={{fontFamily:T.display,fontSize:isMobile?22:36,fontWeight:800,color:T.textPrimary,letterSpacing:"-0.02em"}}>KOL × Fund × Tag Overlap</div></div>
            <BetNum n="05" label="Cross-Map"/>
          </div>
          <div style={{display:"grid",gridTemplateColumns:isMobile?"1fr":"1.5fr 1fr",gap:10}}>
            <Card><SL>◈ NEAR-Active KOL Leaderboard</SL>
              {nearKOLs.map((k,i)=>(<div key={k.Handle+i} style={{display:"grid",gridTemplateColumns:isMobile?"20px 24px 1fr 55px":"24px 28px 1fr 70px 60px",gap:isMobile?6:10,alignItems:"center",padding:"9px 0",borderBottom:`0.5px solid ${T.borderSubtle}`}}>
                <div style={{fontFamily:T.mono,fontSize:8,color:T.textDim}}>#{i+1}</div>
                <Avatar url={k.profile_picture_url} name={k["Display Name"]||k.Handle} size={26}/>
                <div style={{minWidth:0}}><div style={{fontFamily:T.display,fontSize:12,fontWeight:600,color:T.textPrimary,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{k["Display Name"]||k.Handle}</div><div style={{fontFamily:T.mono,fontSize:8,color:T.textDim,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{k.Tags.slice(0,4).join(" · ")}</div></div>
                <div style={{textAlign:"right"}}><div style={{fontFamily:T.mono,fontSize:15,fontWeight:700,color:T.green,lineHeight:1}}>{k["NEAR Mentions"]}◈</div><div style={{fontFamily:T.mono,fontSize:8,color:T.textDim}}>{fmt(k.Followers)}</div></div>
                {!isMobile&&<div style={{fontFamily:T.mono,fontSize:8,fontWeight:700,textTransform:"uppercase",color:TIER_C[k.tier],textAlign:"right"}}>{k.tier}</div>}
              </div>))}
            </Card>
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              {[["AI","AI"],["DeFi","DeFi"],["BTC","Bitcoin"],["Privacy","Privacy"]].map(([tag,fundTag])=>(
                <Card key={tag}>
                  <SL>{tag} Tag · Cross-Overlap</SL>
                  <div style={{display:"grid",gridTemplateColumns:isMobile?"1fr":"1fr 1fr",gap:10}}>
                    <div><div style={{fontFamily:T.mono,fontSize:8,color:T.textDim,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:6}}>KOLS ({KOLS.filter(k=>k.Tags.includes(tag)).length})</div>{KOLS.filter(k=>k.Tags.includes(tag)).slice(0,4).map(k=>(<div key={k.Handle} style={{padding:"4px 0",borderBottom:`0.5px solid ${T.borderSubtle}`}}><div style={{fontFamily:T.display,fontSize:11,color:T.textSecondary,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{k["Display Name"]||k.Handle}</div><div style={{fontFamily:T.mono,fontSize:8,color:T.textDim}}>{fmt(k.Followers)}</div></div>))}</div>
                    <div><div style={{fontFamily:T.mono,fontSize:8,color:T.textDim,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:6}}>FUNDS ({FUNDS.filter(f=>f.tags.includes(fundTag)).length})</div>{FUNDS.filter(f=>f.tags.includes(fundTag)).slice(0,4).map(f=>(<div key={f.Handle} style={{padding:"4px 0",borderBottom:`0.5px solid ${T.borderSubtle}`}}><div style={{fontFamily:T.display,fontSize:11,color:T.textSecondary,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{f["Display Name"]}</div><div style={{fontFamily:T.mono,fontSize:8,color:T.textDim,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{f.Fund}</div></div>))}</div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </>}

        {/* STRATEGY */}
        {nav==="Strategy"&&<>
          <PlusRow/>
          <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:24}}>
            <div><PL>Strategic Recommendations</PL><div style={{fontFamily:T.display,fontSize:isMobile?22:36,fontWeight:800,color:T.textPrimary,letterSpacing:"-0.02em"}}>NEAR Ecosystem Growth Pipeline</div></div>
            <BetNum n="06" label="Strategy"/>
          </div>
          <div style={{display:"grid",gridTemplateColumns:isMobile?"1fr":"1fr 1fr 1fr",gap:10}}>
            <Card>
              <SL>Priority KOL Outreach</SL>
              <div style={{fontFamily:T.display,fontSize:11,color:T.textMuted,marginBottom:14,lineHeight:1.65}}>High-score KOLs already mentioning NEAR — highest ROI for activation.</div>
              {nearKOLs.slice(0,6).map((k,i)=>(<div key={k.Handle+i} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 0",borderBottom:`0.5px solid ${T.borderSubtle}`}}><div style={{fontFamily:T.mono,fontSize:11,fontWeight:700,color:T.green,width:22,flexShrink:0}}>P{i+1}</div><Avatar url={k.profile_picture_url} name={k["Display Name"]||k.Handle} size={26}/><div style={{flex:1,minWidth:0}}><div style={{fontFamily:T.display,fontSize:12,fontWeight:600,color:T.textPrimary,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{k["Display Name"]||k.Handle}</div><div style={{fontFamily:T.mono,fontSize:8,color:T.textDim}}>{k["NEAR Mentions"]}◈ · {fmt(k.Followers)}</div></div><Tag green>WARM</Tag></div>))}
              <div style={{fontFamily:T.mono,fontSize:8,color:T.textDim,textTransform:"uppercase",letterSpacing:"0.08em",margin:"14px 0 8px",borderTop:`0.5px solid ${T.borderSubtle}`,paddingTop:12}}>— MEGA-TIER · COLD —</div>
              {KOLS.filter(k=>!k.nearAligned&&k.tier==="Mega").slice(0,3).map(k=>(<div key={k.Handle+"-cold"} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 0",borderBottom:`0.5px solid ${T.borderSubtle}`}}><Avatar url={k.profile_picture_url} name={k["Display Name"]||k.Handle} size={26}/><div style={{flex:1,minWidth:0}}><div style={{fontFamily:T.display,fontSize:12,fontWeight:600,color:T.textPrimary,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{k["Display Name"]||k.Handle}</div><div style={{fontFamily:T.mono,fontSize:8,color:T.textDim}}>{fmt(k.Followers)} · Score {k.Score.toFixed(0)}</div></div><span style={{fontFamily:T.mono,fontSize:8,fontWeight:700,letterSpacing:"0.06em",textTransform:"uppercase",color:"#CC8888",background:"#1A0808",border:"0.5px solid #441818",borderRadius:3,padding:"2px 7px",flexShrink:0}}>COLD</span></div>))}
            </Card>
            <Card>
              <SL>Fund Relationship Pipeline</SL>
              <div style={{fontFamily:T.display,fontSize:11,color:T.textMuted,marginBottom:14,lineHeight:1.65}}>Top-tier VCs and funds for NEAR ecosystem partnerships.</div>
              {FUNDS.slice(0,13).map((f,i)=>(<div key={f.Handle+i} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 0",borderBottom:`0.5px solid ${T.borderSubtle}`}}><Avatar url={f.profile_picture_url} name={f["Display Name"]} size={26}/><div style={{flex:1,minWidth:0}}><div style={{fontFamily:T.display,fontSize:12,fontWeight:600,color:T.textPrimary,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{f["Display Name"]}</div><div style={{fontFamily:T.mono,fontSize:8,color:T.textDim,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{f.Fund}</div></div><div style={{textAlign:"right",flexShrink:0,display:"flex",flexDirection:"column",alignItems:"flex-end",gap:3}}>{f.nearAligned?<NearBadge/>:<span style={{fontFamily:T.mono,fontSize:8,color:T.textDim,padding:"2px 7px",borderRadius:3,border:`0.5px solid ${T.borderCard}`}}>PROSPECT</span>}<div style={{fontFamily:T.display,fontSize:14,fontWeight:700,color:T.green,lineHeight:1}}>{(Number(f.Score||0)*100).toFixed(0)}</div></div></div>))}
            </Card>
            <Card>
              <SL>Ecosystem Scoring Matrix</SL>
              <div style={{fontFamily:T.display,fontSize:11,color:T.textMuted,marginBottom:18,lineHeight:1.65}}>Strategic priority framework for NEAR growth.</div>
              {[["NEAR Mentioners",nearKOLs.length,KOLS.length],["Mega / Large KOLs",KOLS.filter(k=>["Mega","Large"].includes(k.tier)).length,KOLS.length],["AI Tag",KOLS.filter(k=>k.Tags.includes("AI")).length,KOLS.length],["DeFi Tag",KOLS.filter(k=>k.Tags.includes("DeFi")).length,KOLS.length],["BTC Tag",KOLS.filter(k=>k.Tags.includes("BTC")).length,KOLS.length],["Privacy Tag",KOLS.filter(k=>k.Tags.includes("Privacy")).length,KOLS.length],["Tier 1 Funds",FUNDS.filter(f=>f.tags.includes("Tier 1 VC")).length,FUNDS.length]].map(([label,val,total])=>(<div key={label} style={{marginBottom:15}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}><span style={{fontFamily:T.mono,fontSize:9,color:T.textSecondary,fontWeight:700,letterSpacing:"0.04em"}}>{label}</span><span style={{fontFamily:T.mono,fontSize:9,fontWeight:700}}><span style={{color:T.green}}>{val}</span><span style={{color:T.textDim}}>/{total}</span></span></div><div style={{background:T.bgSurface,border:`0.5px solid ${T.borderSubtle}`,borderRadius:3,height:5,overflow:"hidden"}}><div style={{background:T.green,width:`${Math.round(val/total*100)}%`,height:"100%",borderRadius:3}}/></div></div>))}
              <div style={{marginTop:20,padding:"14px 16px",background:T.bgGlow,border:`0.5px solid ${T.borderCard}`,borderRadius:8,borderLeft:`3px solid ${T.green}`}}>
                <div style={{fontFamily:T.mono,fontSize:9,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:T.green,marginBottom:8}}>◈ NEAR GROWTH INSIGHT</div>
                <div style={{fontFamily:T.display,fontSize:11,color:T.textMuted,lineHeight:1.7}}><span style={{color:T.green,fontWeight:700}}>{nearKOLs.length} KOLs</span> mention NEAR across <span style={{color:T.green,fontWeight:700}}>{RAW_TWEETS.length} tweets</span> generating <span style={{color:T.green,fontWeight:700}}>{fmt(RAW_TWEETS.reduce((a,t)=>a+(t.Impressions||0),0))} impressions</span>. Top mention driver: Altcoin Sherpa.</div>
              </div>
            </Card>
          </div>
        </>}

      </div>

      <div style={{borderTop:`0.5px solid ${T.borderSubtle}`,padding:isMobile?"12px 12px":"12px 40px",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:8}}>
        <div style={{fontFamily:T.mono,fontSize:8,color:T.textFooter,letterSpacing:"0.08em",textTransform:"uppercase"}}>NEAR Intelligence Platform · Ecosystem Growth · Confidential</div>
        <div style={{fontFamily:T.mono,fontSize:8,color:T.textFooter,letterSpacing:"0.06em"}}>{KOLS.length} KOLs · {FUNDS.length} Funds · {RAW_TWEETS.length} Tweets · {new Date().toISOString().slice(0,10)}</div>
      </div>
    </div>
  </>);
}
