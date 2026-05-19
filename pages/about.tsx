import React from "react";
import Image from "next/image";
import Footer from "@/components/footer";
import Header from "@/components/Navigation/header";
import TeamCard from "@/components/teamCard";
import AboutHero from "../public/images/Portfolio/sample-22.webp";
import AboutPhoto from "../public/images/Icon/decoration.png";

const About = () => {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      {/* Header / Navigation */}
      <Header />

      <main className="pt-24">
        {/* Hero Section */}
        <section className="relative h-[40vh] md:h-[50vh] overflow-hidden">
          <Image
            src={AboutHero}
            alt="About Comfort Furniture"
            fill
            className="object-cover transition-transform duration-700 hover:scale-105"
            priority
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <h1 className="text-5xl md:text-7xl font-serif text-white tracking-tight animate-fade-in">
              Our Story
            </h1>
          </div>
        </section>

        {/* Content Section */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-square rounded-3xl overflow-hidden glass p-4 animate-slide-up">
              <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={AboutPhoto}
                  alt="Furniture decoration"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary rounded-full blur-3xl opacity-20" />
            </div>

            <div className="space-y-8 animate-slide-up delay-200">
              <div className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold tracking-widest uppercase">
                Established Experience
              </div>
              <h2 className="text-4xl md:text-5xl font-serif leading-tight">
                Crafting Excellence for Over <span className="text-primary italic">20 Years</span>
              </h2>
              
              <div className="prose prose-lg text-foreground/70 space-y-6">
                <p>
                  <span className="font-bold text-foreground">Comfort Furniture Factory</span> is a leading manufacturer and supplier of custom-built contract furniture, serving the hospitality and leisure industries. We specialize in crafting both contemporary and traditional furniture solutions designed to meet the highest standards of quality and durability.
                </p>
                <p>
                  Backed by a professional management team with over 20 years of combined experience, we have earned the trust of leading hotel chains, contractors, and designers across the Gulf region.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
                  <h4 className="font-serif font-bold mb-2">Bespoke Quality</h4>
                  <p className="text-sm opacity-80 text-foreground/70">Tailored solutions for every project&apos;s unique needs.</p>
                </div>
                <div className="p-4 rounded-xl bg-accent/5 border border-accent/10">
                  <h4 className="font-serif font-bold mb-2">Reliable Design</h4>
                  <p className="text-sm opacity-80 text-foreground/70">Long-lasting performance in demanding environments.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="bg-primary/5 py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-serif mb-4">Meet Our Team</h2>
              <p className="text-foreground/60 max-w-xl mx-auto">
                The experts dedicated to bringing your vision to life with precision and craftsmanship.
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-8">
              <TeamCard
                name={"info"}
                role={"Administrator"}
                email={"info@comfortsplus.com"}
                image={"👨🏻"}
              />
              <TeamCard
                name={"Sales"}
                role={"Sales Executive"}
                email={"sales@comfortsplus.com"}
                image={"👨🏻"}
              />
              <TeamCard
                name={"Shafi Muhammed"}
                role={"Business Development Manager"}
                email={"shafi@comfortsplus.com"}
                image={"👨🏻"}
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
