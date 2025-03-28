import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { CodeEditor } from "@/components/CodeEditor";
import { LivePreview } from "@/components/LivePreview";
import axios from "axios";

export default function WebBuilder() {
  const [prompt, setPrompt] = useState("");
  const [code, setCode] = useState("<h1>Start Building...</h1>");
  const [loading, setLoading] = useState(false);

  const generateCode = async () => {
    setLoading(true);
    try {
      const response = await axios.post("https://api.deepseek.com/generate", {
        prompt,
      });
      setCode(response.data.code || "<h1>Failed to generate</h1>");
    } catch (error) {
      console.error("Error generating code:", error);
      setCode("<h1>Error generating website</h1>");
    }
    setLoading(false);
  };

  return (
    <div className="p-6 flex flex-col gap-4">
      <h1 className="text-2xl font-bold">AI Web Builder</h1>
      <p className="text-gray-600">Enter a description or upload a sketch to generate a website.</p>
      <Card>
        <CardContent className="flex flex-col gap-4">
          <Textarea
            placeholder="Describe your website or upload a sketch..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <Button onClick={generateCode} disabled={loading} className="bg-blue-500 hover:bg-blue-600">
            {loading ? "Generating..." : "Generate Website"}
          </Button>
        </CardContent>
      </Card>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h2 className="text-xl font-semibold">Code Editor</h2>
          <CodeEditor code={code} onChange={setCode} />
        </div>
        <div>
          <h2 className="text-xl font-semibold">Live Preview</h2>
          <LivePreview code={code} />
        </div>
      </div>
    </div>
  );
}
