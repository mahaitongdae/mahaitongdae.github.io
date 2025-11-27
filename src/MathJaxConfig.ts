export const config = {
    loader: { load: ["[tex]/html"] },
    tex: {
        packages: { "[+]": ["html"] },
        inlineMath: [
            ["$", "$"],
            ["\\(", "\\)"]
        ],
        displayMath: [
            ["$$", "$$"],
            ["\\[", "\\]"]
        ],
        tags: "ams",
        // DYNAMIC MACROS DEFINITION HERE
        macros: {
            RR: "\\mathbb{R}",           // Simple replacement
            bfx: "\\mathbf{x}",
            bfy: "\\mathbf{y}",
            bft: "\\mathbf{t}",
            bfz: "\\mathbf{z}",
            bfc: "\\mathbf{c}",
            bold: ["\\mathbf{#1}", 1],    // Macro with 1 argument
            braket: ["\\langle #1 | #2 \\rangle", 2] // Macro with 2 arguments

        }
    }
};