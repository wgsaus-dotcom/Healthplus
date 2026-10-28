import { innerMetadata, PageIntro } from "../InnerPage";
import { roles } from "../simplified-content";

export const metadata = innerMetadata("Roles", "Registered nurses, assistants in nursing, aged care workers, community support workers and allied health professionals.", "/roles");

export default function RolesPage() {
  return <main className="hpi-inner">
    <PageIntro title="Roles" />
    {roles.map(role => <section className="inner-block inner-role" key={role.slug} id={role.slug}>
      <h2>{role.name}</h2><p>{role.text}</p>
      <h3>Checked before placement</h3><p>{role.checks}</p>
      <div className="inner-actions"><a className="hpi-action" href={`/employers?role=${role.slug}#request`}>Request this role</a><a className="hpi-action hpi-action-outline" href={`/work-with-us?profession=${role.slug}#apply`}>Find work as this</a></div>
    </section>)}
    <p className="inner-note">A certificate shows training was completed. It does not by itself prove competence or authority to work, so we look at more than one document.</p>
  </main>;
}
