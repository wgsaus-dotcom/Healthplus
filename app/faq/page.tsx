import { innerMetadata, PageIntro } from "../InnerPage";
import { questions } from "../simplified-content";

export const metadata = innerMetadata("FAQ", "Answers about HPI, workforce requests, registration, role checks and privacy.", "/faq");

export default function FaqPage() {
  const schema={"@context":"https://schema.org","@type":"FAQPage",mainEntity:questions.map(([question,answer])=>({"@type":"Question",name:question,acceptedAnswer:{"@type":"Answer",text:answer}}))};
  return <main className="hpi-inner">
    <PageIntro title="FAQ" />
    <section className="inner-faq" aria-label="Frequently asked questions">{questions.map(([question,answer],index)=><details key={question} id={`question-${index+1}`}><summary>{question}</summary><p>{answer}</p></details>)}</section>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}} />
  </main>;
}
