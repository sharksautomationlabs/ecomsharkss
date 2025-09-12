// Image assets from Figma
const imgImage37 = "/images/main-bg-sand.png";
const imgDangerousSharkUnderwater2Copy1 = "/images/hero-shark.png";
const imgEllipse21 = "/images/expert-arrow-main.svg";
const imgVector7 = "/images/expert-arrow-part1.svg";
const imgExclude = "/images/expert-arrow-part2.svg";
const imgEllipse22 = "/images/hero-button-circle.svg";
const imgChatCircleDots = "/images/hero-chat-icon.svg";
const img91 = "/images/hero-tiktok-logo.png";
const img61 = "/images/hero-amazon-logo.png";
const img72 = "/images/hero-walmart-logo.png";
const img81 = "/images/hero-shopify-logo.png";

interface DangerousSharkUnderwater2Copy1Props {
  property1?: "Default" | "Variant2";
}

function DangerousSharkUnderwater2Copy1({ property1 = "Default" }: DangerousSharkUnderwater2Copy1Props) {
  return (
    <div className="relative size-full" data-name="Property 1=Default" data-node-id="82:3666">
      <div className="absolute flex h-[0px] items-center justify-center translate-x-[-50%] translate-y-[-50%] w-[0px]" style={{ top: "calc(50% - 0.143px)", left: "calc(50% - 0.091px)" }}>
        <div className="flex-none rotate-[187.453deg] scale-y-[-100%]">
          <div className="bg-center bg-no-repeat bg-size-[125.93%_195.42%] h-[493.982px] w-[1149.73px]" data-name="dangerous-shark-underwater (2) copy 1" data-node-id="82:2625" style={{ backgroundImage: `url('${imgDangerousSharkUnderwater2Copy1}')` }} />
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative w-full h-[1001px] overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute bg-center bg-cover bg-no-repeat h-[1473px] left-1/2 top-[-472px] translate-x-[-50%] w-[1964px]" 
        data-name="image 37" 
        data-node-id="88:921" 
        style={{ backgroundImage: `url('${imgImage37}')` }} 
      />
      
      {/* Dark Overlay */}
      <div className="absolute bg-[#052126] h-[1001px] left-0 opacity-60 top-0 w-[1920px]" data-node-id="88:922" />
      
      {/* Hero Content positioned exactly as in Figma */}
      <div className="absolute contents left-[136px] top-[328px]" data-node-id="88:960">
        {/* Live Chat Button */}
        <div className="absolute contents left-[428px] top-[708px]" data-node-id="88:961">
          <div className="absolute bg-white h-16 left-[428px] rounded-[59px] translate-y-[-50%] w-[191px]" data-node-id="88:962" style={{ top: "calc(50% + 239.5px)" }}>
            <div aria-hidden="true" className="absolute border-2 border-[#35c4dd] border-solid inset-[-1px] pointer-events-none rounded-[60px]" />
          </div>
          <div className="absolute font-['Barlow:SemiBold',_sans-serif] leading-[0] left-[456px] not-italic text-[#063f4a] text-[20px] text-nowrap top-[731px]" data-node-id="88:963">
            <p className="leading-[0.961] whitespace-pre">Live Chat</p>
          </div>
          <div className="absolute left-[558px] size-[58px] top-[711px]" data-node-id="88:964">
            <img alt="" className="block max-w-none size-full" src={imgEllipse22} />
          </div>
          <div className="absolute left-[571px] size-8 top-[724px]" data-name="ChatCircleDots" data-node-id="88:965">
            <img alt="" className="block max-w-none size-full" src={imgChatCircleDots} />
          </div>
        </div>
        
        {/* Main Heading */}
        <div className="absolute font-['Barlow_Condensed:SemiBold',_sans-serif] leading-[0] left-[136px] not-italic text-[94px] text-white top-[328px] w-[781px]" data-node-id="88:967">
          <p className="leading-[0.921]">{`Drive Revenue &Dominate the Digital World with Us`}</p>
        </div>
        
        {/* Description */}
        <div className="absolute font-['Barlow:Medium',_sans-serif] leading-[0] left-[136px] not-italic text-[24px] text-white top-[600px] w-[685px]" data-node-id="88:968">
          <p className="leading-[38px]">{`Boost your Digital Presence on Amazon, TikTok,Walmart & Shopify with ECOM SHARKS`}</p>
        </div>
        
        {/* Contact With US Button */}
        <div className="absolute h-16 left-[136px] rounded-[100px] top-[708px] w-[268px]" data-name="Button" data-node-id="88:3173">
          <div className="absolute bg-[#35c4dd] inset-0 rounded-[59px]" id="node-I88_3173-88_3070" />
          <div className="absolute font-['Barlow:SemiBold',_sans-serif] inset-[35.94%_30.6%_34.38%_10.45%] leading-[0] not-italic text-[#063f4a] text-[20px] text-nowrap" id="node-I88_3173-88_3071">
            <p className="leading-[0.961] whitespace-pre">Contact With US</p>
          </div>
          <div className="absolute left-[207px] overflow-clip rounded-[100px] size-[58px] top-[3px]" id="node-I88_3173-88_3072">
            <div className="absolute inset-[31.034%]" id="node-I88_3173-88_3073">
              <img alt="" className="block max-w-none size-full" src={imgEllipse21} />
            </div>
            <div className="absolute flex inset-[99.51%_66.75%_-97.04%_-64.28%] items-center justify-center">
              <div className="flex-none rotate-[315deg] size-10">
                <div className="opacity-0 overflow-clip relative size-full" id="node-I88_3173-88_3074">
                  <div className="absolute contents left-[-4px] top-[-1px]" id="node-I88_3173-88_3075">
                    <div className="absolute flex h-[0px] items-center justify-center left-[18.77px] top-[17.61px] w-[0px]">
                      <div className="flex-none rotate-[27.742deg]">
                        <div className="h-[5.152px] relative w-[4.709px]" id="node-I88_3173-88_3076">
                          <img alt="" className="block max-w-none size-full" src={imgVector7} />
                        </div>
                      </div>
                    </div>
                    <div className="absolute flex h-[0px] items-center justify-center left-[-4px] top-[-1px] w-[0px]">
                      <div className="flex-none rotate-[27.742deg]">
                        <div className="h-[35.422px] relative w-[27.257px]" data-name="Exclude" id="node-I88_3173-88_3077">
                          <img alt="" className="block max-w-none size-full" src={imgExclude} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Shark Image */}
      <div className="absolute h-[638.951px] left-[716px] top-[81px] w-[1204.09px]" data-name="dangerous-shark-underwater (2) copy 1" data-node-id="88:984">
        <div className="absolute flex h-[0px] items-center justify-center translate-x-[-50%] translate-y-[-50%] w-[0px]" style={{ top: "calc(50% - 0.143px)", left: "calc(50% - 0.091px)" }}>
          <div className="flex-none rotate-[187.453deg] scale-y-[-100%]">
            <div className="bg-center bg-no-repeat bg-size-[125.93%_195.42%] h-[493.982px] w-[1149.73px]" data-name="dangerous-shark-underwater (2) copy 1" id="node-I88_984-82_2625" style={{ backgroundImage: `url('${imgDangerousSharkUnderwater2Copy1}')` }} />
          </div>
        </div>
      </div>
      
      {/* Floating Book Elements with exact positioning and rotations from Figma */}
      <div className="absolute flex h-[0px] items-center justify-center left-[686px] top-[492px] w-[0px]">
        <div className="flex-none rotate-[347.003deg]">
          <div className="bg-center bg-cover bg-no-repeat size-[305.952px]" data-name="9 1" data-node-id="600:1102" style={{ backgroundImage: `url('${img91}')` }} />
        </div>
      </div>
      
      <div className="absolute flex h-[0px] items-center justify-center left-[704.89px] top-[707.3px] w-[0px]">
        <div className="flex-none rotate-[351.721deg]">
          <div className="bg-center bg-cover bg-no-repeat size-[282.03px]" data-name="6 1" data-node-id="600:1104" style={{ backgroundImage: `url('${img61}')` }} />
        </div>
      </div>
      
      <div className="absolute flex h-[0px] items-center justify-center left-[1637px] top-[165px] w-[0px]">
        <div className="flex-none rotate-[12.541deg]">
          <div className="bg-center bg-cover bg-no-repeat size-[261.759px]" data-name="7 2" data-node-id="600:1444" style={{ backgroundImage: `url('${img72}')` }} />
        </div>
      </div>
      
      <div className="absolute flex h-[0px] items-center justify-center left-[1475px] top-52 w-[0px]">
        <div className="flex-none rotate-[12.242deg]">
          <div className="bg-center bg-cover bg-no-repeat size-[260px]" data-name="8 1" data-node-id="600:1103" style={{ backgroundImage: `url('${img81}')` }} />
        </div>
      </div>
    </section>
  );
}
