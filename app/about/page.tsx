import { PageHero, SectionHead } from "@/components/SectionHead";

const VALUES = [
  { title: "Genuine, always", description: "No pirated keys or shared accounts — everything we sell is properly licensed." },
  { title: "Real support", description: "We stay reachable after the sale, not just until payment clears." },
  { title: "Fair pricing", description: "Student and regional pricing passed through honestly, not marked up." },
  { title: "Skills that last", description: "We'd rather teach you than keep you dependent on us." },
];

const TEAM = [
  {
    initial: "Y",
    name: "[Your Name]",
    role: "Co-Founder — Technical Lead",
    bio: "Handles software setup, activation, and repair services; builds and maintains the store's website and systems.",
  },
  {
    initial: "P",
    name: "[Partner Name]",
    role: "Co-Founder — Operations & Growth",
    bio: "Manages licensing partnerships, course curation, marketing, accessories stock, and customer support.",
  },
];

const COMPARE_ROWS = [
  "Genuine, activated software",
  "Support after purchase",
  "Safe for your data",
  "Learning, repair & accessories included",
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="Two students, one problem worth solving."
        description="Apex Tech Store started from a simple frustration: genuine software and real tech support shouldn't be this hard to find."
      />

      <section className="py-16">
        <div className="max-w-wrap mx-auto px-7">
          <SectionHead title="Our story" />
          <p className="text-ink text-[1.02rem] mb-4 max-w-[70ch]">
            We&apos;re two BS Computer Science students at the University of Sindh who kept
            running into the same problem — classmates and small shop owners around us either
            paid too much for software they didn&apos;t understand, or turned to pirated copies
            that came with malware, no support, and constant activation issues.
          </p>
          <p className="text-ink text-[1.02rem] max-w-[70ch]">
            Apex Tech Store is our answer: a straightforward, trustworthy place to buy genuine
            software, get it properly set up, learn how to actually use it, and get your hardware
            fixed when it breaks — plus the everyday accessories that go with all of it.
          </p>
        </div>
      </section>

      <section className="bg-ice border-y border-line py-16">
        <div className="max-w-wrap mx-auto px-7">
          <SectionHead title="What we stand for" />
          <div className="flex flex-wrap gap-6">
            {VALUES.map((v) => (
              <div key={v.title} className="flex-1 basis-[220px]">
                <h3 className="text-base font-semibold mb-1.5">{v.title}</h3>
                <p className="text-muted text-sm m-0">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-wrap mx-auto px-7">
          <SectionHead title="The team" description="Two BS Computer Science students, University of Sindh." />
          <div className="flex flex-wrap gap-6">
            {TEAM.map((member) => (
              <div key={member.name} className="flex-1 basis-[280px] bg-ice rounded-2xl p-7">
                <div className="w-16 h-16 rounded-full bg-navy text-white flex items-center justify-center font-serif font-bold text-2xl mb-4.5">
                  {member.initial}
                </div>
                <h3 className="text-[1.1rem] font-semibold mb-1">{member.name}</h3>
                <div className="text-muted text-sm italic mb-3.5">{member.role}</div>
                <p className="text-ink text-sm m-0">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy py-16">
        <div className="max-w-wrap mx-auto px-7">
          <SectionHead
            light
            title="Why people choose Apex over a pirate reseller"
            description="Cheaper isn't always cheaper once something breaks. Here's the real difference."
          />
          <table className="w-full border-collapse border-t border-white/15">
            <thead>
              <tr>
                <th className="p-4 text-left"></th>
                <th className="p-4 text-center w-[130px] text-[#AEB6DE] border-b border-white/10">Pirate reseller</th>
                <th className="p-4 text-center w-[130px] text-gold border-b border-white/10">Apex Tech Store</th>
              </tr>
            </thead>
            <tbody>
              {COMPARE_ROWS.map((row) => (
                <tr key={row}>
                  <td className="p-4 text-[#D7DCF3] text-sm border-b border-white/10">{row}</td>
                  <td className="p-4 text-center text-[#8891BE] border-b border-white/10">✗</td>
                  <td className="p-4 text-center text-gold font-bold border-b border-white/10">✓</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
