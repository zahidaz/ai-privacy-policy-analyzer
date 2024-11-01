import {
  MLCEngineInterface,
  InitProgressReport,
  CreateMLCEngine,
  ChatCompletionMessageParam,
  prebuiltAppConfig,
} from "@mlc-ai/web-llm";

const defaultModel = "Llama-3.2-1B-Instruct-q4f32_1-MLC";
// prebuiltAppConfig.model_list.forEach(({ model_id }) => console.log(`Available model: ${model_id}`));

let engine: MLCEngineInterface | null = null;
let history: ChatCompletionMessageParam[] = [];

export const isModelLoaded = () => engine !== null;

export const loadEngine = async (
  onModelLoaded: () => void,
  progressCallback: (report: InitProgressReport) => void,
  modelId = defaultModel
) => {
  try {

    engine = await CreateMLCEngine(modelId,
      { initProgressCallback: progressCallback },
      { context_window_size: -1, sliding_window_size: 1024, attention_sink_size: 4 });
    console.log("Engine loaded");
    onModelLoaded();
  } catch (error) {
    console.error("Error loading engine:", error);
    throw new Error("Failed to load the engine.");
  }
};

export const clearHistory = () => { history = []; };

export async function* chatStream(message: string, add_to_history: boolean = true): AsyncGenerator<string, void, unknown> {
  if (!engine) throw new Error("Engine not loaded");

  if (add_to_history)
    history.push({ role: "user", content: message });
  else
    history = [{ role: "user", content: message }];

  let response = "";
  try {
    const stream = await engine.chat.completions.create({ stream: true, messages: history });
    
    for await (const { choices } of stream) {
      const content = choices[0]?.delta?.content;
      if (content) {
        response += content;
        yield response;
      }
    }
  } catch (error) {
    console.error("Chat error:", error);
    throw new Error("An error occurred during chat processing.");
  }
}
