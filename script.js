async function generateResume() {
  const apiKey = document.getElementById("apikey").value;
  const name = document.getElementById("name").value;
  const contact = document.getElementById("contact").value;
  const education = document.getElementById("education").value;
  const skills = document.getElementById("skills").value;
  const experience = document.getElementById("experience").value;
  const achievements = document.getElementById("achievements").value;

  document.getElementById("output").innerText = "Generating your resume...";

  const prompt = `
You are an AI Resume Builder for college students.
Build a clean, one-page resume using these 6 sections in order:
1. Name & Contact Info
2. Objective (1-2 lines)
3. Education
4. Skills
5. Projects / Internships / Work Experience
6. Achievements / Extra-Curricular

Use only this real information, do not invent anything:
Name: ${name}
Contact: ${contact}
Education: ${education}
Skills: ${skills}
Experience: ${experience}
Achievements: ${achievements}

Output as plain text with clear section headings.
`;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + apiKey
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }]
      })
    });

    const data = await response.json();
    document.getElementById("output").innerText = data.choices[0].message.content;
  } catch (error) {
    document.getElementById("output").innerText = "Error: " + error;
  }
}
