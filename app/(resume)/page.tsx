import Link from 'next/link'

function Resume() {
  return (
    <>
      <h1 className="font-extrabold">Full-Stack Developer with a Front-End Focus and a Team-First Mentality</h1>
      <section className='grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-5'>
        <div>
          <p>Hi, I'm Glenn Hartong — a Senior Software Engineer with over two decades of experience delivering high-quality web applications and digital solutions. My expertise lies in full-stack development with a strong focus on front-end technologies, particularly React, TypeScript, and modern JavaScript frameworks.</p>
          <p>Recently at RVshare, I led projects from concept through deployment in a remote, agile environment. I also stepped into leadership roles when needed, including filling in for our Engineering Manager. I thrive in collaborative teams, consistently deliver scalable code, and enjoy mentoring junior developers to help them grow.</p>
          <p>Prior to RVshare, I led UI architecture efforts at Signet Jewelers and founded a web development business focused on building custom solutions for small businesses. Across every role, I've brought a strong sense of ownership, technical curiosity, and commitment to solving real-world problems through clean, maintainable code.</p>
        </div>
        <div>
          <p>I'm experienced with tools and technologies like:</p>
          <ul>
            <li>React, NextJS, and JavaScript</li>
            <li>HTML/CSS/SASS, GraphQL, REST</li>
            <li>MySQL, MongoDB, and other databases</li>
            <li>AWS, Heroku, Git, Webpack, Jest, Cypress, and more</li>
          </ul>
          <p>Beyond work, I enjoy personal tech projects (like building a home media server) and have a deep commitment to my local community through Masonic organizations where I've held several leadership positions.</p>
          <p>
            If you're looking for a dependable engineer with a proven track record, strong communication skills, and a knack for both building and leading —{' '}
            <Link href="/contact" aria-label='Contact Glenn Hartong'>
              let's connect
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}

export default Resume;