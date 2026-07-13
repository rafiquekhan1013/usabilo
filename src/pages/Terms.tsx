const getSiteDisplayName = () => {
  const site = (import.meta.env.VITE_SITE_NAME || "").split(".")[0] || "";
  return site ? site.charAt(0).toUpperCase() + site.slice(1).toLowerCase() : "";
};

export default function Terms() {
  const siteName = getSiteDisplayName() || "Usabilo";
  return (
    <div className="max-w-4xl mx-auto" id="terms">
      <section className="py-12 border-b-2 border-orange-200 mb-12">
        <h1 className="mb-4 text-4xl text-gray-900">Research Participation Agreement</h1>
        <div className="h-1 w-20 bg-orange-500 mb-6"></div>
        <p className="text-xl text-gray-600 leading-relaxed">Effective Date: February 28, 2026</p>
      </section>
      <article className="space-y-6 text-gray-700 leading-relaxed">
        <p>{siteName} Research Inc. (&quot;{siteName}&quot;, &quot;we&quot;, &quot;our&quot;) is an independent user-experience and interface evaluation organization. This Research Participation Agreement (the &quot;Agreement&quot;) governs your access to and participation in any {siteName} studies, testing programs, surveys, or structured research initiatives (collectively, the &quot;Programs&quot;).</p>
        <p>By participating in any Program, you confirm that you have read, understood, and agreed to this Agreement.</p>
        <p>{siteName} and the participant are each referred to as a &quot;Party&quot; and collectively as the &quot;Parties.&quot;</p>

        <h2 className="text-xl font-semibold text-gray-900 mt-10 mb-4 first:mt-0">1. Research Objective</h2>
        <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">1.1 Analytical Focus</h3>
        <p>{siteName} conducts structured research centered on usability, clarity, workflow efficiency, interface logic, onboarding friction, system transparency, and control accessibility within regulated or age-restricted digital environments.</p>
        <p>Programs may involve evaluation of:</p>
        <ul>
          <li>Registration processes</li>
          <li>Identity verification pacing</li>
          <li>Deposit and withdrawal clarity</li>
          <li>Navigation hierarchy</li>
          <li>Feature discoverability</li>
          <li>Dashboard usability</li>
          <li>Control and limit settings</li>
          <li>Customer support access</li>
        </ul>
        <p>Research outputs may be anonymized, aggregated, synthesized, and used for internal or external analytical reporting purposes.</p>

        <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">1.2 What {siteName} Does Not Do</h3>
        <p>{siteName} is not:</p>
        <ul>
          <li>A gambling operator</li>
          <li>A sportsbook or casino</li>
          <li>A gaming platform</li>
          <li>A payment processor</li>
          <li>A financial institution</li>
        </ul>
        <p>{siteName} does not operate wagering services, accept deposits, process withdrawals, provide inducements, or facilitate gambling activity.</p>

        <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">1.3 Excluded Research Areas</h3>
        <p>{siteName} Programs do not include the analysis, promotion, or comparison of bonuses, incentives, inducements, or commercial promotional offers.</p>

        <h2 className="text-xl font-semibold text-gray-900 mt-10 mb-4">2. Independence and Neutral Position</h2>
        <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">2.1 Structural Independence</h3>
        <p>{siteName} operates independently and is not owned, controlled, or directed by any third-party platform evaluated in research.</p>
        <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">2.2 No Commercial Compensation</h3>
        <p>{siteName} does not receive commissions, referral fees, revenue share, or performance-based payments from any platform referenced in its research.</p>

        <h2 className="text-xl font-semibold text-gray-900 mt-10 mb-4">3. Participation Conditions</h2>
        <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">3.1 Eligibility</h3>
        <p>Participation is restricted to individuals who are at least nineteen (19) years of age and legally capable of entering binding agreements.</p>
        <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">3.2 Voluntary Nature</h3>
        <p>Participation in {siteName} Programs is entirely voluntary. Participants may discontinue involvement at any time.</p>
        <p>Participation does not require:</p>
        <ul>
          <li>Depositing funds</li>
          <li>Placing wagers</li>
          <li>Engaging commercially with any third-party platform</li>
        </ul>
        <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">3.3 Independent Capacity</h3>
        <p>Participants act solely in their personal capacity. No employment, agency, partnership, fiduciary, or advisory relationship is created.</p>
        <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">3.4 No Advisory Role</h3>
        <p>{siteName} does not provide financial, legal, investment, or gambling advice and does not recommend any third-party services.</p>

        <h2 className="text-xl font-semibold text-gray-900 mt-10 mb-4">4. Compensation Terms</h2>
        <p>If compensation is offered, it is provided solely for time spent completing structured usability or research tasks.</p>
        <p>Compensation:</p>
        <ul>
          <li>Is not contingent upon wagering</li>
          <li>Is not tied to deposits</li>
          <li>Is not linked to promotional offers</li>
          <li>Is not performance-based relative to third-party platforms</li>
        </ul>
        <p>{siteName} reserves the right to withhold compensation for incomplete, misleading, inaccurate, or non-compliant submissions.</p>

        <h2 className="text-xl font-semibold text-gray-900 mt-10 mb-4">5. Confidentiality</h2>
        <p>Participants may gain access to non-public materials, test environments, structured evaluation criteria, or internal methodologies.</p>
        <p>Such information is confidential and must not be disclosed, reproduced, or used outside the scope of participation.</p>
        <p>Confidentiality obligations survive termination of participation.</p>

        <h2 className="text-xl font-semibold text-gray-900 mt-10 mb-4">6. Intellectual Property</h2>
        <p>All data, feedback, structured evaluations, submissions, recordings, and analyses generated through participation are the exclusive property of {siteName}.</p>
        <p>Participants assign all rights, title, and interest in such materials to {siteName} and waive moral rights to the extent permitted by law.</p>

        <h2 className="text-xl font-semibold text-gray-900 mt-10 mb-4">7. Responsible Engagement Statement</h2>
        <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">7.1 Research-Only Context</h3>
        <p>{siteName} Programs are conducted strictly within a research framework focused on system clarity and consumer transparency. They are not intended to promote or encourage gambling activity.</p>
        <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">7.2 Informational Materials</h3>
        <p>{siteName} may provide general consumer protection or responsible engagement information for educational purposes. Such materials are informational only.</p>
        <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">7.3 No Monitoring Obligation</h3>
        <p>{siteName} does not monitor participant behavior beyond the scope of structured research and does not provide treatment, counseling, or intervention services.</p>

        <h2 className="text-xl font-semibold text-gray-900 mt-10 mb-4">8. Data Protection</h2>
        <p>{siteName} collects, processes, and stores personal information in accordance with applicable Canadian privacy laws, including the Personal Information Protection and Electronic Documents Act (PIPEDA).</p>
        <p>Research outputs may be anonymized and aggregated.</p>

        <h2 className="text-xl font-semibold text-gray-900 mt-10 mb-4">9. Limitation of Liability</h2>
        <p>To the fullest extent permitted by law, {siteName} shall not be liable for indirect, incidental, consequential, special, or punitive damages arising from participation in Programs.</p>
        <p>Total liability shall not exceed the total compensation paid to the participant, if any.</p>

        <h2 className="text-xl font-semibold text-gray-900 mt-10 mb-4">10. Indemnification</h2>
        <p>Participants agree to indemnify and hold harmless {siteName} and its officers, directors, employees, contractors, and affiliates from any claims arising out of:</p>
        <ul>
          <li>Participation in Programs</li>
          <li>Breach of this Agreement</li>
          <li>Misrepresentation</li>
          <li>Independent actions outside the research scope</li>
        </ul>
        <p>This obligation survives termination.</p>

        <h2 className="text-xl font-semibold text-gray-900 mt-10 mb-4">11. Suspension or Removal</h2>
        <p>{siteName} may suspend, terminate, or disqualify participation at its discretion for:</p>
        <ul>
          <li>Non-compliance</li>
          <li>Misrepresentation</li>
          <li>Conduct compromising research integrity</li>
        </ul>
        <p>Unpaid compensation may be forfeited.</p>

        <h2 className="text-xl font-semibold text-gray-900 mt-10 mb-4">12. Modifications</h2>
        <p>{siteName} may amend this Agreement by posting updated terms. Continued participation constitutes acceptance.</p>

        <h2 className="text-xl font-semibold text-gray-900 mt-10 mb-4">13. Assignment</h2>
        <p>{siteName} may assign this Agreement without participant consent. Participants may not assign their rights under this Agreement.</p>

        <h2 className="text-xl font-semibold text-gray-900 mt-10 mb-4">14. Force Majeure</h2>
        <p>{siteName} is not responsible for delays or failures caused by events beyond reasonable control, including system outages, governmental actions, cyber incidents, or natural disasters.</p>

        <h2 className="text-xl font-semibold text-gray-900 mt-10 mb-4">15. Governing Law</h2>
        <p>This Agreement shall be governed by the laws of the Province of Ontario and the federal laws of Canada applicable therein.</p>
        <p>Participants irrevocably submit to the exclusive jurisdiction of the courts of Toronto, Ontario.</p>
      </article>
    </div>
  );
}
