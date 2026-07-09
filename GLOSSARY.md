# Glossary

One-line definitions of the core terms this playbook uses. Model-agnostic — no
version numbers, no benchmarks. For the design and engineering consequences
behind these, see [FOUNDATIONS.md](FOUNDATIONS.md).

| Term | Definition |
|------|-----------|
| **Artificial intelligence (AI)** | Software that performs tasks normally associated with human intelligence, such as recognizing patterns, generating language, or making predictions. |
| **Machine learning** | Building systems that learn patterns from data rather than being explicitly programmed with rules. |
| **Neural network** | A model made of layered, interconnected units whose numeric weights are tuned during training to map inputs to outputs. |
| **Deep learning** | Machine learning with many-layered neural networks, able to learn complex patterns directly from raw data. |
| **Large language model (LLM)** | A neural network trained on large amounts of text to predict and generate language. |
| **Generative AI** | Models that produce new content — text, images, audio, code — rather than only classifying or scoring existing content. |
| **Foundation model** | A large model pre-trained broadly enough to be adapted to many downstream tasks. |
| **Pre-training** | The initial phase where a model learns general structure from a large corpus. |
| **Fine-tuning** | Further training a pre-trained model on a narrower dataset to specialize it. |
| **RLHF** | Reinforcement Learning from Human Feedback — using human preference signals to align a model's behaviour with what people find helpful and safe. |
| **Inference** | Running a trained model to produce an output for a given input. |
| **Inference-time scaling** | Spending more compute at inference — e.g. longer or multi-step reasoning — to improve answers without retraining. |
| **Token** | A sub-word chunk of text; the unit models actually read and generate, and the unit cost and context limits are measured in. |
| **Context window** | The maximum number of tokens a model can attend to at once for a single response. |
| **Knowledge cutoff** | The point in time after which a model has no built-in awareness of events, because its training corpus was frozen. |
| **Embedding** | A vector representation of content that places similar-meaning items near each other in a high-dimensional space. |
| **Embedding space** | The high-dimensional space in which embeddings live; distance approximates similarity of meaning. |
| **Temperature** | A setting that controls randomness in generation — lower is more focused and deterministic, higher is more varied and exploratory. |
| **Zero-shot** | Asking a model to do a task with no worked examples in the prompt, relying on what it learned in training. |
| **Few-shot** | Providing a handful of examples in the prompt to steer the model toward the desired behaviour. |
| **Hallucination** | Fluent, confident output that is factually wrong or unsupported — a prediction presented as fact. |
| **Classification** | Assigning input to one of a set of human-defined categories. |
| **Clustering** | Grouping data by similarity into machine-discovered groups, without predefined categories. |
| **Semantic search** | Retrieving content by meaning via embedding similarity, rather than exact keyword match. |
| **Agentic system** | Software where a model plans and takes multi-step actions toward a goal, often using tools, rather than answering a single prompt. |
| **Guardrails** | Checks that filter or constrain model inputs and outputs to keep behaviour safe and on-policy. |
| **Harness** | The engineering that wraps a model to turn raw intelligence into reliable, useful work — its three layers being the model, the data/API integrations, and the verification that stops bad output from cascading. The model is the unit of compute; the harness is what you own around it. See [HARNESS.md](HARNESS.md). |
| **Hard-verifiable task** | A task with a cheap, objective correctness check built in (code that must compile and pass tests, a query that runs) — so the harness can verify its own output and iterate. |
| **Soft-verifiable task** | A task with no objective correctness check (a strategy memo, a support reply, a tax filing) — "correct" is a judgment call, so the harness needs heavier verification and, for stakes, a human in the loop. |

See also: [FOUNDATIONS.md](FOUNDATIONS.md) · [HARNESS.md](HARNESS.md) · [data/capabilities/](data/capabilities/) · [AI_AGENT_PATTERNS_PLAYBOOK.md](AI_AGENT_PATTERNS_PLAYBOOK.md)
