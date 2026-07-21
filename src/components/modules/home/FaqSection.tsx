"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";

const faqs = [
  {
    id: "item-1",
    question: "How do credits work in AI Generate Studio?",
    answer:
      "Each AI generation (Image, Video, Voiceover, or Chat response) consumes credits depending on the model and output resolution. Free users receive complimentary daily credit refills, while Pro and Enterprise plans include monthly credit allotments and rollover benefits.",
  },
  {
    id: "item-2",
    question: "What AI models are supported on the platform?",
    answer:
      "We integrate industry-leading models into a single workspace, including Flux 1.1 Pro, DALL-E 3, Sora Video Engine, Midjourney rendering pipelines, and natural human voice synthesis models.",
  },
  {
    id: "item-3",
    question: "Do I own full commercial rights to my generated content?",
    answer:
      "Yes, 100%! All images, videos, audio tracks, and copy generated using AI Generate Studio belong entirely to you. You are free to use them for commercial projects, client work, advertising, and digital products.",
  },
  {
    id: "item-4",
    question: "Can I upscale images to 4K and 8K resolution?",
    answer:
      "Yes! Our built-in AI Super Resolution Upscaler allows you to enhance any generated image up to 4K or 8K resolution while sharpening details, textures, and removing digital noise.",
  },
  {
    id: "item-5",
    question: "Can I cancel or change my subscription at any time?",
    answer:
      "Absolutely. You can upgrade, downgrade, or cancel your subscription at any time from your Account Dashboard with a single click. There are no long-term commitments or hidden cancellation fees.",
  },
];

export function FaqSection() {
  return (
    <section className="py-24 px-4 max-w-4xl mx-auto relative z-10 w-full">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary mb-4">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Frequently Asked Questions</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
          Got Questions? We Have Answers
        </h2>
        <p className="text-muted-foreground text-base sm:text-lg">
          Everything you need to know about AI Generate Studio, credits,
          licenses, and features.
        </p>
      </div>

      {/* Accordion List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="w-full rounded-2xl border border-border/60 bg-card/40 backdrop-blur-md p-6 md:p-8 shadow-xl"
      >
        <Accordion defaultValue={["item-1"]} className="w-full space-y-2">
          {faqs.map((faq) => (
            <AccordionItem
              key={faq.id}
              value={faq.id}
              className="border-b border-border/40 pb-2 transition-colors w-full"
            >
              <AccordionTrigger className="text-left font-semibold text-base sm:text-lg text-foreground hover:text-primary transition-colors py-4 no-underline hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-4 pt-1 w-full">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    </section>
  );
}
