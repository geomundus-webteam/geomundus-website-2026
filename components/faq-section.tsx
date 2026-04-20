"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Faq } from "@/sanity.types";
import PortableTextRenderer from "./portable-text-renderer";

interface FAQSectionProps {
  faqs: Faq[];
}

export default function FaqSection({ faqs }: FAQSectionProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFaqs = faqs.filter((faq) =>
    faq.question?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="max-w-3xl mx-auto">
      <div className="relative mb-8">
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
        <Input
          placeholder="Search questions..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {filteredFaqs.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">
            No questions found matching your search.
          </p>
        </div>
      ) : (
        <Accordion type="single" collapsible className="w-full">
          {filteredFaqs.map((faq) => (
            <AccordionItem key={faq._id} value={faq._id}>
              <AccordionTrigger className="text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent>
                <div className="prose max-w-none">
                  <PortableTextRenderer value={faq.answer || []} />
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </div>
  );
}
