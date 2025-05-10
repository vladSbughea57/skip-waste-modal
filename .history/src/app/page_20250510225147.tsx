"use client";

import React, { useState } from "react";
import PostcodeForm from "@/components/PostcodeForm";
import SkipOptions from "@/components/SkipOptions";
import { SkipOption } from "@/types";

const Home: React.FC = () => {
  const [postcode, setPostcode] = useState<string>("");
  const [area, setArea] = useState<string>("");
  const [selectedSkip, setSelectedSkip] = useState<SkipOption | null>(null);

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Skip Hire</h1>

      <PostcodeForm
        onSubmit={({ postcode, area }) => {
          setPostcode(postcode);
          setArea(area);
          setSelectedSkip(null);
        }}
      />

      {postcode && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">
            Available Skips for {postcode}
          </h2>
          <SkipOptions
            postcode={postcode}
            area={area}
            onSelect={(skip) => setSelectedSkip(skip)}
          />
        </div>
      )}

      {selectedSkip && (
        <div className="mt-6 border-t pt-4">
          <h3 className="text-lg font-bold mb-2">Selected Skip</h3>
          <p>{selectedSkip.size} Yard Skip</p>
          <p>£{(selectedSkip.price_before_vat * (1 + selectedSkip.vat / 100)).toFixed(2)} incl. VAT</p>
        </div>
      )}
    </main>
  );
};

export default Home;