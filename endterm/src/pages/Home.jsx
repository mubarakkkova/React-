import React from 'react'

export default function Home() {
  return (
    <section>
      <h1>Welcome to Dummy Products Explorer</h1>
      <p>
        This app demonstrates React Router, API calls, search with query parameters,
        and detailed pages using the DummyJSON products API.
      </p>
      <p>
        Use the navigation bar to browse items, read about the project, or open the
        login placeholder page.
      </p>

      <div style={{ marginTop: '24px' }}>
        <img
          src="https://images.pexels.com/photos/5632405/pexels-photo-5632405.jpeg"
          alt="Shopping illustration"
          style={{
            maxWidth: '100%',
            borderRadius: '12px',
            boxShadow: '0 8px 18px rgba(0,0,0,.15)'
          }}
        />
      </div>
    </section>
  )
}
