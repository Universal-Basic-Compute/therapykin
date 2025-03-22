import React from "react";

export default function TherapyComparison() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-4 text-center">TherapyKin & Traditional Therapy</h2>
        <p className="text-center max-w-2xl mx-auto mb-16 text-foreground/70">
          Understanding how TherapyKin complements traditional therapeutic approaches
        </p>
        
        <div className="overflow-x-auto">
          <table className="w-full mb-8">
            <thead>
              <tr>
                <th className="p-4 text-left"></th>
                <th className="p-4 text-center bg-[var(--primary)]/10 rounded-tl-lg font-bold">TherapyKin</th>
                <th className="p-4 text-center bg-[var(--background-alt)] rounded-tr-lg font-bold">Traditional Therapy</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-4 font-medium">Availability</td>
                <td className="p-4 text-center bg-[var(--primary)]/5">24/7 access</td>
                <td className="p-4 text-center bg-[var(--background-alt)]/50">Scheduled appointments</td>
              </tr>
              <tr>
                <td className="p-4 font-medium">Accessibility</td>
                <td className="p-4 text-center bg-[var(--primary)]/5">From anywhere</td>
                <td className="p-4 text-center bg-[var(--background-alt)]/50">Location-dependent</td>
              </tr>
              <tr>
                <td className="p-4 font-medium">Session Length</td>
                <td className="p-4 text-center bg-[var(--primary)]/5">Flexible</td>
                <td className="p-4 text-center bg-[var(--background-alt)]/50">Fixed (usually 50 min)</td>
              </tr>
              <tr>
                <td className="p-4 font-medium">Cost</td>
                <td className="p-4 text-center bg-[var(--primary)]/5">$59-149/month</td>
                <td className="p-4 text-center bg-[var(--background-alt)]/50">$100-200/session</td>
              </tr>
              <tr>
                <td className="p-4 font-medium">Privacy</td>
                <td className="p-4 text-center bg-[var(--primary)]/5">Complete privacy</td>
                <td className="p-4 text-center bg-[var(--background-alt)]/50">Office visits</td>
              </tr>
              <tr>
                <td className="p-4 font-medium">Consistency</td>
                <td className="p-4 text-center bg-[var(--primary)]/5">Always available</td>
                <td className="p-4 text-center bg-[var(--background-alt)]/50">Weekly/biweekly</td>
              </tr>
              <tr>
                <td className="p-4 font-medium">Approach</td>
                <td className="p-4 text-center bg-[var(--primary)]/5">Adapts over time</td>
                <td className="p-4 text-center bg-[var(--background-alt)]/50">Therapist-dependent</td>
              </tr>
              <tr>
                <td className="p-4 font-medium">Memory</td>
                <td className="p-4 text-center bg-[var(--primary)]/5">Perfect recall</td>
                <td className="p-4 text-center bg-[var(--background-alt)]/50">Note-based</td>
              </tr>
              <tr>
                <td className="p-4 font-medium">Best For</td>
                <td className="p-4 text-center bg-[var(--primary)]/5 rounded-bl-lg">
                  <p>Daily support</p>
                  <p>Skill building</p>
                  <p>Ongoing maintenance</p>
                </td>
                <td className="p-4 text-center bg-[var(--background-alt)]/50 rounded-br-lg">
                  <p>Complex trauma</p>
                  <p>Diagnosis needs</p>
                  <p>Crisis situations</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="card p-6 max-w-3xl mx-auto card-hover-glow">
          <p className="text-center font-medium text-lg mb-2">TherapyKin works well alongside traditional therapy</p>
          <p className="text-center text-foreground/70">Many users find the greatest benefit comes from using TherapyKin between traditional therapy sessions to reinforce skills, maintain progress, and provide support when their therapist isn't available.</p>
        </div>
      </div>
    </section>
  );
}
