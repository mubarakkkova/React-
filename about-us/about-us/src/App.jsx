export default function App() {
  return (
    <main className="about-section">
      <div className="layout">
        <aside className="left-header">
          <div className="v-center-box">
            <h2 className="mb-0">About me</h2>
          </div>
        </aside>

        <section className="content">
          <div className="main-content">
            <header className="main-header">
              <h6 className="sub-heading">Who I am</h6>
              <h1 className="main-heading">Danelya Mubarakova</h1>
            </header>

            <div className="about-row">
              <div className="about-image">
                <img src="/me.jpeg" alt="My photo" />
              </div>

              <div className="about-text">
                <h3>My bio</h3>
                <p>
                  My name is Danelya, I’m 20 years old.
                  I’m a 3rd-year student at KBTU, majoring in Information Systems.
                  I’m from Pavlodar, but currently live in Almaty.
                  I speak Kazakh, Russian, and English.
                </p>

                <ul className="contact-list">
                  <li>
                    <span className="label">Email:</span>{" "}
                    <a href="mailto:mubarakkkova@mail.ru">mubarakkkova@mail.ru</a>
                  </li>
                  <li>
                    <span className="label">Telegram:</span>{" "}
                    <a href="https://t.me/dmwiayy" target="_blank" rel="noreferrer">@dmwiayy</a>
                  </li>
                  <li>
                    <span className="label">GitHub:</span>{" "}
                    <a href="https://github.com/mubarakkkova" target="_blank" rel="noreferrer">
                      github.com/mubarakkkova
                    </a>
                  </li>
                  <li>
                    <span className="label">LinkedIn:</span>{" "}
                    <a href="https://linkedin.com/in/mubarakkkova" target="_blank" rel="noreferrer">
                      linkedin.com/in/mubarakkkova
                    </a>
                  </li>
                </ul>

                <p className="note">To pass the course, you need to know</p>

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
                  <i className="fas fa-headphones icon-18" aria-hidden="true" />
                  <div className="media-body">
                    <p className="data-number">Dancing</p>
                    <p className="data-label">Hip-hop, Jazz funk</p>
                  </div>
                </article>

                <article className="media">
                  <i className="fas fa-book-open icon-18" aria-hidden="true" />
                  <div className="media-body">
                    <p className="data-number">Reading</p>
                    <p className="data-label">detective and romance genres</p>
                  </div>
                </article>

                
                <article className="media">
                  <i className="fas fa-utensils icon-18" aria-hidden="true" />
                  <div className="media-body">
                    <p className="data-number">Cooking</p>
                    <p className="data-label">hot dishes and baking</p>
                  </div>
                </article>

                
                <article className="media">
                  <i className="fas fa-guitar icon-18" aria-hidden="true" />
                  <div className="media-body">
                    <p className="data-number">Dombra</p>
                    <p className="data-label">Kazakh national instrument</p>
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
