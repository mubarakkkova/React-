export default function App() {
    return (
      <main className="about-section">
        <div className="layout">
          {/* левый баннер (виден на десктопе) */}
          <aside className="left-header">
            <div className="v-center-box">
              <h2 className="mb-0">About Us</h2>
            </div>
          </aside>
  
          {/* контент справа */}
          <section className="content">
            <div className="main-content">
              <header className="main-header">
                <h6 className="sub-heading">Who we are</h6>
                <h1 className="main-heading">&lt; About &gt;</h1>
              </header>
  
              <div className="about-row">
                <div className="about-image">
                  <img
                    src="https://source.unsplash.com/35sVnCCynWA/784x1250"
                    alt="Colorful Wall"
                  />
                </div>
  
                <div className="about-text">
                  <h3>We’re a small study team</h3>
                  <p>
                    We learn frontend together and build tiny projects for practice.
                    This “About us” page is part of our coursework project.
                    No sensitive info here — only shared contacts.
                  </p>
  
                  <ul className="contact-list">
                    <li><span className="label">Email:</span> <a href="mailto:team@example.com">team@example.com</a></li>
                    <li><span className="label">Telegram:</span> <a href="https://t.me/yourhandle" target="_blank" rel="noreferrer">@yourhandle</a></li>
                    <li><span className="label">GitHub:</span> <a href="https://github.com/yourusername" target="_blank" rel="noreferrer">github.com/yourusername</a></li>
                    <li><span className="label">LinkedIn:</span> <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noreferrer">linkedin.com/in/yourusername</a></li>
                  </ul>
                  <p className="note">* Не указывайте адрес и другие чувствительные данные.</p>
  
                  <div className="about-skills">
                    <div className="skills-row">
                      <article className="media">
                        <i className="fab fa-js-square icon-18" aria-hidden="true" />
                        <div className="media-body">
                          <h4>JavaScript</h4>
                          <p>DOM, fetch, promises, небольшие компоненты, tooling.</p>
                        </div>
                      </article>
  
                      <article className="media">
                        <i className="fab fa-react icon-18" aria-hidden="true" />
                        <div className="media-body">
                          <h4>React</h4>
                          <p>JSX, state/props, базовый роутинг, композиция.</p>
                        </div>
                      </article>
                    </div>
  
                    <div className="skills-row">
                      <article className="media">
                        <i className="fab fa-sass icon-18" aria-hidden="true" />
                        <div className="media-body">
                          <h4>Sass/CSS</h4>
                          <p>Адаптивные сетки, утилити-классы, чистый компонентный CSS.</p>
                        </div>
                      </article>
  
                      <article className="media">
                        <i className="fab fa-node-js icon-18" aria-hidden="true" />
                        <div className="media-body">
                          <h4>Node.js</h4>
                          <p>Dev tooling, простые серверы и API для демо-проектов.</p>
                        </div>
                      </article>
                    </div>
                  </div>
                </div>
              </div>
  
              <div className="about-data">
                <div className="stats-row">
                  <article className="media">
                    <i className="fas fa-mug-hot icon-18" aria-hidden="true" />
                    <div className="media-body">
                      <p className="data-number">10,950</p>
                      <p className="data-label">Cups of coffee</p>
                    </div>
                  </article>
  
                  <article className="media">
                    <i className="fas fa-code icon-18" aria-hidden="true" />
                    <div className="media-body">
                      <p className="data-number">8,475,000</p>
                      <p className="data-label">Lines of code</p>
                    </div>
                  </article>
  
                  <article className="media">
                    <i className="fas fa-bus icon-18" aria-hidden="true" />
                    <div className="media-body">
                      <p className="data-number">8,214</p>
                      <p className="data-label">Buses taken</p>
                    </div>
                  </article>
  
                  <article className="media">
                    <i className="far fa-smile-wink icon-18" aria-hidden="true" />
                    <div className="media-body">
                      <p className="data-number">3,165</p>
                      <p className="data-label">Awkward winks</p>
                    </div>
                  </article>
                </div>
              </div>
  
              <footer className="footer">
                <small>© {new Date().getFullYear()} Our Study Team</small>
              </footer>
            </div>
          </section>
        </div>
      </main>
    );
  }
  