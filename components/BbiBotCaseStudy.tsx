import ProjectGallery from './ProjectGallery';

export default function BbiBotCaseStudy() {
  return <details className="engineering-notes bbi-case-study" id="koin-bbi-bot">
    <summary>Building Bbi-bot</summary>
    <div className="notes-content">
      <section className="bbi-story-section">
        <p>While leading front-end work at BCSD Lab, I wanted our team to know when KOIN was failing before students had to tell us. Pages could return a 500 error, fail an API request, or slow down during server-side rendering without giving us enough visibility into what had happened.</p>
      </section>
      <section className="bbi-story-section">
        <p>I built Bbi-bot to bring production errors into our #front_end Slack channel. Alongside Sentry monitoring, this gave us a place to see slow requests, homepage downtime, and runtime exceptions with the release that was running when they occurred.</p>
      </section>
      <section className="bbi-story-section bbi-story-columns">
        <div>
          <p>One alert caught a homepage check returning HTTP 500. Another showed a 403 AxiosError in getServerSideProps, tagged with release 9a2d63db8877. Having that version attached gave us somewhere to start: check the deployment, investigate the regression, and decide whether to roll back.</p>
        </div>
        <figure className="bbi-alert-excerpt">
          <div><span className="bbi-alert-label">Uptime check</span><strong>500 Internal Server Error</strong><p>Homepage check failed<br />State: Regressed</p></div>
          <div><span className="bbi-alert-label">SSR exception</span><strong>AxiosError · HTTP 403</strong><p>getServerSideProps (/)<br />Environment: production<br />Release: <code>9a2d63db8877</code></p></div>
          <figcaption>From the Slack alerts, transcribed in English with teammate details removed.</figcaption>
        </figure>
      </section>
      <section className="bbi-story-section bbi-story-columns">
        <div>
          <p>Then we had the opposite problem: too many alerts. Tracking p95 latency helped us notice slow requests, but our static 750 ms threshold also caught spikes that recovered on their own. More than ten Critical alerts arrived in 24 hours, and developers began muting the channel.</p>
          <p>Getting an error into Slack was only the first part. I also had to decide when it was worth interrupting someone.</p>
        </div>
        <ProjectGallery images={[{src: '/portfolio-images/bbi-bot-alert-fatigue.png', alt: 'Annotated p95 latency graph showing repeated spikes and alert markers around a static 750 millisecond threshold.', label: 'Repeated latency alerts', width: 1376, height: 768}]} title="Bbi-bot alert fatigue" kind="desktop" caption="Brief p95 spikes kept crossing the 750 ms threshold. During the rollout, we received more than ten Critical alerts in a day." />
      </section>
      <section className="bbi-story-section">
        <p>I changed the rules so temporary latency warnings and non-critical 4xx errors went to routine logs or tickets. Immediate alerts focused on failures that persisted and affected students, such as homepage downtime or a recurring regression.</p>
      </section>
      <section className="bbi-story-section">
        <p>After those changes, we received approximately <strong>40% fewer Critical alerts</strong>. That made the channel less noisy while keeping release context available for investigation. I came away thinking less about how many failures a bot could report and more about what a teammate should be able to do when one arrived.</p>
      </section>
      <ProjectGallery images={[{src: '/portfolio-images/bbi-bot-latency-alerts.png', alt: 'Two Sentry Slack notifications for critical server p95 latency, each with a time-series graph.', label: 'Sentry notifications in Slack', width: 1376, height: 768}]} title="Bbi-bot monitoring evidence" kind="desktop" caption="Two of the Critical latency notifications that appeared in Slack." />
    </div>
  </details>;
}
