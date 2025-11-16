
async function load(path){
  try{ let r = await fetch(path); return await r.json(); }
  catch(e){ return null; }
}

async function init(){
  document.getElementById("year").innerText = new Date().getFullYear();

  const hero = await load("content/hero.json");
  if(hero){
    document.getElementById("hero_title").innerText = hero.title;
    document.getElementById("hero_tagline").innerText = hero.tagline;
    document.getElementById("resume_link").href = hero.resume;
    document.getElementById("profile_photo").src = hero.photo;
  }

  const about = await load("content/about.json");
  if(about) document.getElementById("about_content").innerHTML = `<p>${about.text}</p>`;

  const skills = await load("content/skills.json");
  if(skills){
    document.getElementById("skills_list").innerHTML = skills.map(s=>`
      <div class="card skill-card">
        <img src="${s.icon}" class="skill-icon"/>
        <strong>${s.skill}</strong> — ${s.level}%
      </div>`).join("");
  }

  const timeline = await load("content/timeline.json");
  if(timeline){
    document.getElementById("timeline_list").innerHTML = timeline.map(t=>`
      <div class="card">
        <h4>${t.title}</h4>
        <p>${t.place}</p>
        <p>${t.year}</p>
      </div>`).join("");
  }

  const certs = await load("content/certificates.json");
  if(certs){
    document.getElementById("cert_list").innerHTML = certs.map(c=>`
      <div class="card">
        <h4>${c.title}</h4>
        <p>${c.issuer} — ${c.date}</p>
        ${c.file ? `<a href="${c.file}" target="_blank" class="btn">View</a>` : ""}
      </div>`).join("");
  }

  const projects = await load("content/projects.json");
  if(projects){
    document.getElementById("proj_list").innerHTML = projects.map(p=>`
      <div class="card">
        <h4>${p.title}</h4>
        <p>${p.excerpt}</p>
      </div>`).join("");
  }

  const tests = await load("content/testimonials.json");
  if(tests){
    document.getElementById("test_list").innerHTML = tests.map(t=>`
      <div class="card">
        <p>"${t.quote}"</p>
        <strong>— ${t.name}, ${t.role}</strong>
      </div>`).join("");
  }

  const blog = await load("content/blog.json");
  if(blog){
    document.getElementById("blog_list").innerHTML = blog.map(b=>`
      <div class="card">
        <h4>${b.title}</h4>
        <p>${b.excerpt}</p>
      </div>`).join("");
  }
}

init();
