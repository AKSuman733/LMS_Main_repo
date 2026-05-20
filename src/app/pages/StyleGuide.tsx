import { Star, Check, BookOpen, Clock, Users, TrendingUp } from 'lucide-react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';

export function StyleGuide() {
  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-[1280px] mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-0 mb-4">
            <span className="text-[40px] font-bold text-[#2D1B69]">Learnify</span>
            <div className="w-[8px] h-[8px] rounded-full bg-[#BBFF00] ml-1"></div>
          </div>
          <h1 className="text-[56px] font-bold text-[#1A1A2E] mb-2">Design System</h1>
          <p className="text-[18px] text-[#6B6B80]">
            Complete component library and design tokens for the EdTech platform
          </p>
        </div>

        {/* Color Palette */}
        <section className="mb-16">
          <h2 className="text-[28px] font-bold text-[#1A1A2E] mb-6">Color Palette</h2>

          <div className="mb-6">
            <h3 className="text-[20px] font-semibold text-[#1A1A2E] mb-4">Brand Colors</h3>
            <div className="grid grid-cols-4 gap-4">
              <div>
                <div className="h-24 rounded-[16px] bg-[#2D1B69] mb-2"></div>
                <div className="text-[13px] font-medium text-[#1A1A2E]">Indigo 900</div>
                <div className="text-[12px] text-[#6B6B80]">#2D1B69</div>
              </div>
              <div>
                <div className="h-24 rounded-[16px] bg-[#3D2879] mb-2"></div>
                <div className="text-[13px] font-medium text-[#1A1A2E]">Indigo 800</div>
                <div className="text-[12px] text-[#6B6B80]">#3D2879</div>
              </div>
              <div>
                <div className="h-24 rounded-[16px] bg-[#EDE9FF] mb-2"></div>
                <div className="text-[13px] font-medium text-[#1A1A2E]">Indigo 100</div>
                <div className="text-[12px] text-[#6B6B80]">#EDE9FF</div>
              </div>
              <div>
                <div className="h-24 rounded-[16px] bg-[#BBFF00] mb-2"></div>
                <div className="text-[13px] font-medium text-[#1A1A2E]">Action Lime</div>
                <div className="text-[12px] text-[#6B6B80]">#BBFF00</div>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-[20px] font-semibold text-[#1A1A2E] mb-4">Neutral Colors</h3>
            <div className="grid grid-cols-5 gap-4">
              <div>
                <div className="h-24 rounded-[16px] bg-[#1A1A2E] mb-2"></div>
                <div className="text-[13px] font-medium text-[#1A1A2E]">Neutral 900</div>
                <div className="text-[12px] text-[#6B6B80]">#1A1A2E</div>
              </div>
              <div>
                <div className="h-24 rounded-[16px] bg-[#6B6B80] mb-2"></div>
                <div className="text-[13px] font-medium text-[#1A1A2E]">Neutral 600</div>
                <div className="text-[12px] text-[#6B6B80]">#6B6B80</div>
              </div>
              <div>
                <div className="h-24 rounded-[16px] bg-[#E2E1F0] mb-2"></div>
                <div className="text-[13px] font-medium text-[#1A1A2E]">Neutral 200</div>
                <div className="text-[12px] text-[#6B6B80]">#E2E1F0</div>
              </div>
              <div>
                <div className="h-24 rounded-[16px] bg-[#F7F6F3] border border-[#E2E1F0] mb-2"></div>
                <div className="text-[13px] font-medium text-[#1A1A2E]">Neutral 50</div>
                <div className="text-[12px] text-[#6B6B80]">#F7F6F3</div>
              </div>
              <div>
                <div className="h-24 rounded-[16px] bg-white border border-[#E2E1F0] mb-2"></div>
                <div className="text-[13px] font-medium text-[#1A1A2E]">White</div>
                <div className="text-[12px] text-[#6B6B80]">#FFFFFF</div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-[20px] font-semibold text-[#1A1A2E] mb-4">Feedback Colors</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="h-24 rounded-[16px] bg-[#22C55E] mb-2"></div>
                <div className="text-[13px] font-medium text-[#1A1A2E]">Success</div>
                <div className="text-[12px] text-[#6B6B80]">#22C55E</div>
              </div>
              <div>
                <div className="h-24 rounded-[16px] bg-[#F59E0B] mb-2"></div>
                <div className="text-[13px] font-medium text-[#1A1A2E]">Warning</div>
                <div className="text-[12px] text-[#6B6B80]">#F59E0B</div>
              </div>
              <div>
                <div className="h-24 rounded-[16px] bg-[#EF4444] mb-2"></div>
                <div className="text-[13px] font-medium text-[#1A1A2E]">Error</div>
                <div className="text-[12px] text-[#6B6B80]">#EF4444</div>
              </div>
            </div>
          </div>
        </section>

        {/* Typography */}
        <section className="mb-16">
          <h2 className="text-[28px] font-bold text-[#1A1A2E] mb-6">Typography</h2>
          <div className="space-y-4 bg-[#F7F6F3] rounded-[16px] p-8">
            <div className="border-b border-[#E2E1F0] pb-4">
              <div className="text-[56px] font-bold text-[#1A1A2E] leading-tight mb-2">
                Heading 1
              </div>
              <div className="text-[13px] text-[#6B6B80]">
                Plus Jakarta Sans • 56px • Bold (700) • Line height 1.15
              </div>
            </div>
            <div className="border-b border-[#E2E1F0] pb-4">
              <div className="text-[40px] font-bold text-[#1A1A2E] leading-tight mb-2">
                Heading 2
              </div>
              <div className="text-[13px] text-[#6B6B80]">
                Plus Jakarta Sans • 40px • Bold (700) • Line height 1.15
              </div>
            </div>
            <div className="border-b border-[#E2E1F0] pb-4">
              <div className="text-[28px] font-bold text-[#1A1A2E] leading-tight mb-2">
                Heading 3
              </div>
              <div className="text-[13px] text-[#6B6B80]">
                Plus Jakarta Sans • 28px • Bold (700) • Line height 1.15
              </div>
            </div>
            <div className="border-b border-[#E2E1F0] pb-4">
              <div className="text-[20px] font-semibold text-[#1A1A2E] leading-tight mb-2">
                Heading 4
              </div>
              <div className="text-[13px] text-[#6B6B80]">
                Plus Jakarta Sans • 20px • Semibold (600) • Line height 1.15
              </div>
            </div>
            <div className="border-b border-[#E2E1F0] pb-4">
              <div className="text-[18px] text-[#1A1A2E] leading-relaxed mb-2">
                Body Large — For introductory text and important descriptions
              </div>
              <div className="text-[13px] text-[#6B6B80]">
                Plus Jakarta Sans • 18px • Regular (400) • Line height 1.65
              </div>
            </div>
            <div className="border-b border-[#E2E1F0] pb-4">
              <div className="text-[16px] text-[#1A1A2E] leading-relaxed mb-2">
                Body Default — Primary body text for paragraphs and content
              </div>
              <div className="text-[13px] text-[#6B6B80]">
                Plus Jakarta Sans • 16px • Regular (400) • Line height 1.65
              </div>
            </div>
            <div className="border-b border-[#E2E1F0] pb-4">
              <div className="text-[14px] text-[#1A1A2E] leading-relaxed mb-2">
                Body Small — Secondary content and supporting text
              </div>
              <div className="text-[13px] text-[#6B6B80]">
                Plus Jakarta Sans • 14px • Regular (400) • Line height 1.65
              </div>
            </div>
            <div className="border-b border-[#E2E1F0] pb-4">
              <div className="text-[13px] font-medium text-[#1A1A2E] mb-2">
                Label Text
              </div>
              <div className="text-[13px] text-[#6B6B80]">
                Plus Jakarta Sans • 13px • Medium (500)
              </div>
            </div>
            <div>
              <div className="text-[12px] text-[#6B6B80] mb-2">
                Caption Text
              </div>
              <div className="text-[13px] text-[#6B6B80]">
                Plus Jakarta Sans • 12px • Regular (400)
              </div>
            </div>
          </div>
        </section>

        {/* Buttons */}
        <section className="mb-16">
          <h2 className="text-[28px] font-bold text-[#1A1A2E] mb-6">Buttons</h2>
          <div className="grid grid-cols-3 gap-6">
            <div>
              <h3 className="text-[16px] font-semibold text-[#1A1A2E] mb-4">Primary</h3>
              <Button>Get started free</Button>
              <div className="mt-2 text-[13px] text-[#6B6B80]">
                Indigo bg • Lime text • 48px height • 10px radius
              </div>
            </div>
            <div>
              <h3 className="text-[16px] font-semibold text-[#1A1A2E] mb-4">Secondary</h3>
              <Button variant="secondary">Learn more</Button>
              <div className="mt-2 text-[13px] text-[#6B6B80]">
                White bg • Indigo border • Indigo text
              </div>
            </div>
            <div>
              <h3 className="text-[16px] font-semibold text-[#1A1A2E] mb-4">Ghost</h3>
              <Button variant="ghost">Sign in</Button>
              <div className="mt-2 text-[13px] text-[#6B6B80]">
                Transparent • Indigo text • Underline on hover
              </div>
            </div>
          </div>
        </section>

        {/* Inputs */}
        <section className="mb-16">
          <h2 className="text-[28px] font-bold text-[#1A1A2E] mb-6">Form Inputs</h2>
          <div className="grid grid-cols-2 gap-6 max-w-3xl">
            <Input label="Default State" placeholder="Enter your email" />
            <Input label="With Icon" placeholder="Search" icon={<Check size={20} />} />
            <Input label="Error State" placeholder="Invalid email" error="Please enter a valid email address" />
            <Input label="Disabled State" placeholder="Disabled" disabled />
          </div>
          <div className="mt-4 text-[13px] text-[#6B6B80]">
            48px height • 10px radius • Indigo focus border with subtle glow
          </div>
        </section>

        {/* Cards */}
        <section className="mb-16">
          <h2 className="text-[28px] font-bold text-[#1A1A2E] mb-6">Card Styles</h2>
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white rounded-[16px] border border-[#E2E1F0] p-6 shadow-[0_2px_16px_rgba(45,27,105,0.06)]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#2D1B69]/10 flex items-center justify-center">
                  <BookOpen size={20} className="text-[#2D1B69]" />
                </div>
                <h3 className="text-[16px] font-bold text-[#1A1A2E]">Standard Card</h3>
              </div>
              <p className="text-[14px] text-[#6B6B80]">
                White background, 16px radius, 1px border, subtle shadow
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#EDE9FF] to-[#F7F6F3] rounded-[16px] border border-[#E2E1F0] p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#2D1B69]/10 flex items-center justify-center">
                  <Star size={20} className="text-[#2D1B69]" />
                </div>
                <h3 className="text-[16px] font-bold text-[#1A1A2E]">Gradient Card</h3>
              </div>
              <p className="text-[14px] text-[#6B6B80]">
                Indigo gradient background for certificates and highlights
              </p>
            </div>
          </div>
        </section>

        {/* Icons */}
        <section className="mb-16">
          <h2 className="text-[28px] font-bold text-[#1A1A2E] mb-6">Icon System</h2>
          <div className="bg-[#F7F6F3] rounded-[16px] p-6">
            <p className="text-[14px] text-[#6B6B80] mb-6">
              Using Lucide React icons • Default 20px • Compact 16px
            </p>
            <div className="flex gap-6">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-2">
                  <BookOpen size={20} className="text-[#2D1B69]" />
                </div>
                <div className="text-[12px] text-[#6B6B80]">20px</div>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mb-2">
                  <Clock size={16} className="text-[#2D1B69]" />
                </div>
                <div className="text-[12px] text-[#6B6B80]">16px</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-2">
                  <Users size={20} className="text-[#2D1B69]" />
                </div>
                <div className="text-[12px] text-[#6B6B80]">20px</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-2">
                  <TrendingUp size={20} className="text-[#22C55E]" />
                </div>
                <div className="text-[12px] text-[#6B6B80]">Success</div>
              </div>
            </div>
          </div>
        </section>

        {/* Spacing */}
        <section className="mb-16">
          <h2 className="text-[28px] font-bold text-[#1A1A2E] mb-6">Spacing System</h2>
          <div className="bg-[#F7F6F3] rounded-[16px] p-6">
            <p className="text-[14px] text-[#6B6B80] mb-6">8px base unit</p>
            <div className="space-y-3">
              {[8, 16, 24, 32, 48, 64, 80].map((size) => (
                <div key={size} className="flex items-center gap-4">
                  <div className="w-20 text-[13px] font-medium text-[#1A1A2E]">
                    {size}px
                  </div>
                  <div
                    className="h-8 bg-[#2D1B69] rounded"
                    style={{ width: `${size}px` }}
                  ></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Lime Accent Usage */}
        <section className="mb-16">
          <h2 className="text-[28px] font-bold text-[#1A1A2E] mb-6">
            Lime Accent Usage Rule
          </h2>
          <div className="bg-[#BBFF00]/10 border-2 border-[#BBFF00] rounded-[16px] p-6">
            <p className="text-[16px] font-bold text-[#1A1A2E] mb-4">
              ⚠️ Lime (#BBFF00) appears ONLY on:
            </p>
            <ul className="space-y-2 text-[14px] text-[#1A1A2E]">
              <li className="flex items-center gap-2">
                <Check size={16} className="text-[#2D1B69]" />
                Primary CTA button text
              </li>
              <li className="flex items-center gap-2">
                <Check size={16} className="text-[#2D1B69]" />
                Active navigation indicator dot (6px)
              </li>
              <li className="flex items-center gap-2">
                <Check size={16} className="text-[#2D1B69]" />
                Progress fill bars
              </li>
              <li className="flex items-center gap-2">
                <Check size={16} className="text-[#2D1B69]" />
                Enrollment count badges
              </li>
            </ul>
            <p className="text-[14px] text-[#6B6B80] mt-4">
              Everywhere else: use indigo (#2D1B69) or neutral grays
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
