// App.jsx
import { useState } from 'react';
import { Dialog } from '@headlessui/react';

export default function App() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      const fakeResponse = {
        answer:
          'Yes, under Section 166 of the Motor Vehicles Act, 1988, the claimants are entitled to an addition for future prospects even when the deceased was self-employed and aged 54–55 years at the time of the accident. In Dani Devi v. Pritam Singh, the Court held that 10% of the deceased’s annual income should be added as future prospects.',
        citations: [
          {
            text:
              'as the age of the deceased at the time of accident was held to be about 54-55 years by the learned Tribunal, being self-employed, as such, 10% of annual income should have been awarded on account of future prospects. (Para 7)',
            source: 'Dani_Devi_v_Pritam_Singh.pdf',
            link: "/docs/judgment.pdf"
          },
        ],
      };
      setResponse(fakeResponse);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 py-10 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Lexi Legal Assistant</h1>

      <div className="w-full max-w-2xl bg-gray-800 shadow-lg rounded-xl p-6 space-y-4">
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask a legal question..."
          className="w-full h-28 p-4 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        ></textarea>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition"
        >
          {loading ? 'Thinking...' : 'Submit'}
        </button>
      </div>

      {response && (
        <div className="w-full max-w-2xl mt-6 space-y-4">
          <div className="bg-gray-800 p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-2">Answer</h2>
            <p className="text-gray-200 leading-relaxed">{response.answer}</p>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold mb-2">Citation</h3>
            <button
              onClick={() => setOpen(true)}
              className="text-blue-400 underline hover:text-blue-300 transition"
            >
              <a
  href={response.citations[0].link}
  target="_blank"
  rel="noopener noreferrer"
  className="text-blue-400 underline hover:text-blue-300 transition"
>
  {response.citations[0].text}
</a>

            </button>
          </div>
        </div>
      )}

      <Dialog open={open} onClose={() => setOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/60" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-4xl h-[80vh] rounded-xl overflow-hidden shadow-lg relative">
          {/* Modal Header */}
<div className="flex items-center justify-between p-4 bg-gray-100 border-b relative">
  <h2 className="text-gray-800 font-semibold text-lg">📄 Judgment PDF</h2>

  <div className="flex items-center gap-4">
    {/* Download Button */}
    <a
      href={response?.citations[0].link}
      download="Judgment.pdf"
      className="text-sm text-blue-600 hover:text-blue-800 underline font-medium"
    >
      ⬇ Download
    </a>

    {/* Close Button */}
    <button
      onClick={() => setOpen(false)}
      className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 hover:text-black text-xl"
      title="Close"
    >
      ✕
    </button>
  </div>
</div>


            <iframe
              src={response?.citations[0].link}
              title="Judgment PDF"
              className="w-full h-full border-none"
            />
          </div>
        </div>
      </Dialog>
    </div>
  );
}
