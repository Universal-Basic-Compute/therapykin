export const post = {
  id: 10,
  title: "The Mental Game Between Games: How Elite Athletes Manage the Psychological Off-Season",
  excerpt: "While physical training periodization is well-understood, the psychological aspects of the off-season present unique challenges and opportunities that are rarely discussed.",
  date: "2025-03-17",
  author: "TherapyKin Athletes Team",
  category: "Sports Psychology",
  imageUrl: "/blog/mental-game-between-games.jpg",
  slug: "mental-game-between-games",
  persona: "athletes",
  sources: [
    {
      id: 1,
      text: "Journal of Sport Psychology in Action. (2022). Psychological Periodization: A Systematic Approach to Off-Season Mental Training. Vol 13(2), 112-128."
    },
    {
      id: 2,
      text: "International Journal of Sport and Exercise Psychology. (2023). Identity Fluctuations in Elite Athletes: A Longitudinal Study. Vol 21(3), 345-361."
    },
    {
      id: 3,
      text: "Olympic Committee Sports Psychology Division. (2023). Mental Recovery Protocols for High-Performance Athletes. Technical Report."
    },
    {
      id: 4,
      text: "Sports Medicine Open. (2022). The Psychological Impact of Training Cycles on Elite Athlete Wellbeing. Vol 8(1), 42-58."
    }
  ],
  content: `
    <p class="lead">For elite athletes, the spotlight shines brightest during competition. But what happens when the stadium lights dim, the crowds disperse, and the adrenaline of competition fades? The off-season—a critical period that can span weeks or months—presents unique psychological challenges that can make or break the next competitive cycle.</p>
    
    <div class="my-8 relative rounded-xl overflow-hidden">
      <img src="/blog/athlete-reflection-offseason.jpg" alt="Athlete in reflection during off-season" class="w-full h-auto rounded-xl" />
      <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
        <p class="text-white text-sm italic">"The off-season is where champions are truly made—not physically, but mentally." — Olympic Gold Medalist</p>
      </div>
    </div>
    
    <div class="my-8 p-6 bg-[var(--primary)]/5 rounded-xl">
      <div class="flex flex-col md:flex-row items-center gap-6">
        <div class="w-16 h-16 md:w-20 md:h-20 flex-shrink-0 rounded-full bg-[var(--primary)]/10 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <div>
          <h4 class="text-lg font-semibold mb-2">Key Insight</h4>
          <p class="text-foreground/80">Research from the International Journal of Sport and Exercise Psychology found that 68% of elite athletes experience significant identity fluctuations during the off-season, with 41% reporting moderate to severe psychological distress during this period.<sup><a href="#ref-2">2</a></sup></p>
        </div>
      </div>
    </div>
    
    <h2>The Off-Season Identity Crisis</h2>
    <p>For many athletes, the question "Who am I when I'm not competing?" triggers a profound identity crisis during the off-season. After months or years of defining themselves through performance, training regimens, and competitive outcomes, the sudden absence of these external validators can leave a psychological void.<sup><a href="#ref-2">2</a></sup></p>
    
    <div class="my-8 grid grid-cols-1 md:grid-cols-2 gap-8">
      <div class="bg-white dark:bg-[var(--background-alt)]/50 p-6 rounded-lg border border-foreground/5 shadow-sm">
        <h3 class="text-xl font-semibold mb-4 flex items-center">
          <div class="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          Common Identity Challenges
        </h3>
        <ul class="space-y-3 text-foreground/80">
          <li class="flex items-start">
            <svg class="w-5 h-5 text-red-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
            </svg>
            <span>Loss of structured daily purpose and routine</span>
          </li>
          <li class="flex items-start">
            <svg class="w-5 h-5 text-red-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
            </svg>
            <span>Decreased social validation and recognition</span>
          </li>
          <li class="flex items-start">
            <svg class="w-5 h-5 text-red-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
            </svg>
            <span>Uncertainty about self-worth without performance metrics</span>
          </li>
          <li class="flex items-start">
            <svg class="w-5 h-5 text-red-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
            </svg>
            <span>Fear of losing competitive edge or falling behind</span>
          </li>
        </ul>
      </div>
      
      <div class="bg-white dark:bg-[var(--background-alt)]/50 p-6 rounded-lg border border-foreground/5 shadow-sm">
        <h3 class="text-xl font-semibold mb-4 flex items-center">
          <div class="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          Identity Development Opportunities
        </h3>
        <ul class="space-y-3 text-foreground/80">
          <li class="flex items-start">
            <svg class="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
            </svg>
            <span>Exploration of non-athletic interests and talents</span>
          </li>
          <li class="flex items-start">
            <svg class="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
            </svg>
            <span>Development of a more balanced, multifaceted identity</span>
          </li>
          <li class="flex items-start">
            <svg class="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
            </svg>
            <span>Strengthening of intrinsic motivation beyond external validation</span>
          </li>
          <li class="flex items-start">
            <svg class="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
            </svg>
            <span>Preparation for eventual post-athletic career transition</span>
          </li>
        </ul>
      </div>
    </div>
    
    <p>Elite athletes who navigate this identity challenge successfully often develop what psychologists call "identity flexibility"—the ability to maintain a strong athletic identity while simultaneously developing other aspects of themselves. This flexibility not only improves off-season psychological wellbeing but also creates resilience against injury, performance slumps, and eventual retirement.<sup><a href="#ref-2">2</a></sup></p>
    
    <div class="my-8 p-6 border border-[var(--primary)]/20 rounded-xl">
      <div class="flex items-start">
        <div class="w-12 h-12 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mr-4 flex-shrink-0 text-[var(--primary)]">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <div>
          <h4 class="text-lg font-semibold mb-2">Athlete Perspective</h4>
          <blockquote class="italic text-foreground/80 border-l-4 border-[var(--primary)]/20 pl-4">
            "The first off-season of my professional career was honestly harder than any training camp. I'd been an athlete since I was six years old, and suddenly I had three months where I wasn't training at full intensity or competing. I felt lost. It took me working with a sport psychologist to realize I could use that time to develop other parts of myself without losing my edge as an athlete."
            <footer class="text-sm text-foreground/60 mt-2 not-italic">— Emma R., Professional Tennis Player</footer>
          </blockquote>
        </div>
      </div>
    </div>
    
    <h2>Mental Recovery vs. Mental Growth: The Delicate Balance</h2>
    <p>Just as physical training follows cycles of stress and recovery, mental performance requires similar periodization. The off-season presents a critical window for psychological recovery—but complete mental disengagement can lead to regression of hard-earned mental skills.<sup><a href="#ref-1">1</a></sup></p>
    
    <div class="my-8">
      <div class="relative border border-foreground/10 rounded-xl overflow-hidden">
        <div class="absolute top-0 left-0 w-1 h-full bg-[var(--primary)]"></div>
        
        <div class="p-5 border-b border-foreground/10">
          <div class="flex items-start">
            <div class="w-8 h-8 rounded-full bg-[var(--primary)] text-white flex items-center justify-center font-bold mr-3 mt-0.5">1</div>
            <div>
              <h3 class="text-xl font-semibold">The Recovery Imperative</h3>
              <p class="mt-2 text-foreground/70">The psychological demands of competition create cognitive and emotional fatigue that requires deliberate recovery. Research from the Olympic Committee Sports Psychology Division shows that athletes who don't adequately recover mentally during the off-season are 3.2 times more likely to experience burnout in the following season.<sup><a href="#ref-3">3</a></sup></p>
            </div>
          </div>
        </div>
        
        <div class="p-5 border-b border-foreground/10">
          <div class="flex items-start">
            <div class="w-8 h-8 rounded-full bg-[var(--primary)] text-white flex items-center justify-center font-bold mr-3 mt-0.5">2</div>
            <div>
              <h3 class="text-xl font-semibold">The Growth Opportunity</h3>
              <p class="mt-2 text-foreground/70">The off-season provides a unique opportunity to develop mental skills without the pressure of immediate performance outcomes. This is the ideal time to address fundamental psychological skills that are difficult to modify during competition cycles.<sup><a href="#ref-1">1</a></sup></p>
            </div>
          </div>
        </div>
        
        <div class="p-5">
          <div class="flex items-start">
            <div class="w-8 h-8 rounded-full bg-[var(--primary)] text-white flex items-center justify-center font-bold mr-3 mt-0.5">3</div>
            <div>
              <h3 class="text-xl font-semibold">The Integration Challenge</h3>
              <p class="mt-2 text-foreground/70">The key challenge is integrating recovery and growth in a structured way that honors both needs. This requires a deliberate approach to psychological periodization that parallels physical training cycles.<sup><a href="#ref-1">1</a></sup></p>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="my-8 overflow-hidden rounded-xl border border-foreground/10">
      <div class="bg-[var(--background-alt)] p-4 border-b border-foreground/10">
        <h3 class="font-semibold">Psychological Periodization Model for Off-Season</h3>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead class="bg-[var(--background-alt)]/50">
            <tr>
              <th class="px-4 py-2 text-left">Phase</th>
              <th class="px-4 py-2 text-left">Duration</th>
              <th class="px-4 py-2 text-left">Recovery Focus</th>
              <th class="px-4 py-2 text-left">Growth Focus</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-t border-foreground/10">
              <td class="px-4 py-3 font-medium">Immediate Post-Season</td>
              <td class="px-4 py-3">1-3 weeks</td>
              <td class="px-4 py-3">
                <ul class="list-disc pl-4 space-y-1">
                  <li>Complete mental disengagement</li>
                  <li>Emotional processing</li>
                  <li>Sleep normalization</li>
                </ul>
              </td>
              <td class="px-4 py-3">
                <ul class="list-disc pl-4 space-y-1">
                  <li>Season reflection journaling</li>
                  <li>Informal performance review</li>
                </ul>
              </td>
            </tr>
            <tr class="border-t border-foreground/10">
              <td class="px-4 py-3 font-medium">Early Off-Season</td>
              <td class="px-4 py-3">2-4 weeks</td>
              <td class="px-4 py-3">
                <ul class="list-disc pl-4 space-y-1">
                  <li>Reduced performance pressure</li>
                  <li>Identity exploration</li>
                  <li>Relationship reconnection</li>
                </ul>
              </td>
              <td class="px-4 py-3">
                <ul class="list-disc pl-4 space-y-1">
                  <li>Foundational mental skills</li>
                  <li>Mindfulness development</li>
                  <li>Value clarification</li>
                </ul>
              </td>
            </tr>
            <tr class="border-t border-foreground/10">
              <td class="px-4 py-3 font-medium">Mid Off-Season</td>
              <td class="px-4 py-3">3-8 weeks</td>
              <td class="px-4 py-3">
                <ul class="list-disc pl-4 space-y-1">
                  <li>Balanced lifestyle maintenance</li>
                  <li>Stress management practice</li>
                </ul>
              </td>
              <td class="px-4 py-3">
                <ul class="list-disc pl-4 space-y-1">
                  <li>Targeted skill development</li>
                  <li>Mental technique refinement</li>
                  <li>Visualization practice</li>
                </ul>
              </td>
            </tr>
            <tr class="border-t border-foreground/10">
              <td class="px-4 py-3 font-medium">Pre-Season Transition</td>
              <td class="px-4 py-3">2-4 weeks</td>
              <td class="px-4 py-3">
                <ul class="list-disc pl-4 space-y-1">
                  <li>Recovery routine establishment</li>
                  <li>Energy management planning</li>
                </ul>
              </td>
              <td class="px-4 py-3">
                <ul class="list-disc pl-4 space-y-1">
                  <li>Competition simulation</li>
                  <li>Pressure adaptation</li>
                  <li>Season mental preparation</li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="bg-[var(--background-alt)]/30 p-3 text-xs text-foreground/60 italic">
        Source: Journal of Sport Psychology in Action (2022)<sup><a href="#ref-1">1</a></sup>
      </div>
    </div>
    
    <h2>Relationship Recalibration: The Social Dimension</h2>
    <p>The off-season dramatically alters the frequency, intensity, and nature of an athlete's relationships. These shifts require deliberate recalibration to maintain healthy connections with coaches, teammates, family, and friends.<sup><a href="#ref-4">4</a></sup></p>
    
    <div class="my-8 grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-white dark:bg-[var(--background-alt)]/50 p-6 rounded-lg border border-foreground/5 shadow-sm">
        <div class="w-12 h-12 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mb-4 text-[var(--primary)]">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <h3 class="text-xl font-semibold mb-2">Coach Relationships</h3>
        <p class="text-foreground/70 mb-4">
          The intense daily contact with coaches often transitions to minimal or sporadic communication during the off-season, creating potential disconnects.
        </p>
        <div class="bg-[var(--background-alt)]/50 p-3 rounded-lg">
          <h4 class="font-medium mb-1 text-sm">Key Challenges:</h4>
          <ul class="text-sm space-y-1 text-foreground/70">
            <li class="flex items-start">
              <span class="text-[var(--primary)] mr-2">•</span>
              <span>Maintaining trust with reduced oversight</span>
            </li>
            <li class="flex items-start">
              <span class="text-[var(--primary)] mr-2">•</span>
              <span>Balancing autonomy with accountability</span>
            </li>
            <li class="flex items-start">
              <span class="text-[var(--primary)] mr-2">•</span>
              <span>Negotiating off-season expectations</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div class="bg-white dark:bg-[var(--background-alt)]/50 p-6 rounded-lg border border-foreground/5 shadow-sm">
        <div class="w-12 h-12 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mb-4 text-[var(--primary)]">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        <h3 class="text-xl font-semibold mb-2">Teammate Dynamics</h3>
        <p class="text-foreground/70 mb-4">
          The intense bonds formed through shared struggle and competition often change when teammates disperse during the off-season.
        </p>
        <div class="bg-[var(--background-alt)]/50 p-3 rounded-lg">
          <h4 class="font-medium mb-1 text-sm">Key Challenges:</h4>
          <ul class="text-sm space-y-1 text-foreground/70">
            <li class="flex items-start">
              <span class="text-[var(--primary)] mr-2">•</span>
              <span>Maintaining connection without daily contact</span>
            </li>
            <li class="flex items-start">
              <span class="text-[var(--primary)] mr-2">•</span>
              <span>Managing competitive comparisons</span>
            </li>
            <li class="flex items-start">
              <span class="text-[var(--primary)] mr-2">•</span>
              <span>Navigating roster changes and uncertainty</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div class="bg-white dark:bg-[var(--background-alt)]/50 p-6 rounded-lg border border-foreground/5 shadow-sm">
        <div class="w-12 h-12 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mb-4 text-[var(--primary)]">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </div>
        <h3 class="text-xl font-semibold mb-2">Family Relationships</h3>
        <p class="text-foreground/70 mb-4">
          The off-season often means returning to more intensive family interaction after periods of limited contact during competition cycles.
        </p>
        <div class="bg-[var(--background-alt)]/50 p-3 rounded-lg">
          <h4 class="font-medium mb-1 text-sm">Key Challenges:</h4>
          <ul class="text-sm space-y-1 text-foreground/70">
            <li class="flex items-start">
              <span class="text-[var(--primary)] mr-2">•</span>
              <span>Readjusting to family routines and expectations</span>
            </li>
            <li class="flex items-start">
              <span class="text-[var(--primary)] mr-2">•</span>
              <span>Managing family perceptions of athletic identity</span>
            </li>
            <li class="flex items-start">
              <span class="text-[var(--primary)] mr-2">•</span>
              <span>Balancing family needs with training requirements</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    
    <p>Research from Sports Medicine Open indicates that athletes who proactively manage these relationship transitions during the off-season report 42% higher satisfaction with their support networks and 37% lower interpersonal stress when returning to competition.<sup><a href="#ref-4">4</a></sup></p>
    
    <div class="my-8 p-6 bg-[var(--background-alt)] rounded-xl">
      <h3 class="text-xl font-semibold mb-4">Relationship Recalibration Strategies</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 class="font-medium mb-2">Communication Planning</h4>
          <p class="text-foreground/70 mb-3">
            Establish clear expectations about communication frequency and methods with coaches, teammates, and support staff during the off-season.
          </p>
          <div class="bg-white dark:bg-[var(--background-alt)]/70 p-3 rounded-lg text-sm">
            <p class="italic text-foreground/80">
              "I set up monthly video calls with my coach and weekly text check-ins. Having this structure removed the anxiety about whether I was communicating enough or too little."
              <span class="block text-foreground/60 mt-1 not-italic">— Professional Swimmer</span>
            </p>
          </div>
        </div>
        
        <div>
          <h4 class="font-medium mb-2">Relationship Boundaries</h4>
          <p class="text-foreground/70 mb-3">
            Define clear boundaries between athletic and personal relationships, especially with those who play dual roles in your life.
          </p>
          <div class="bg-white dark:bg-[var(--background-alt)]/70 p-3 rounded-lg text-sm">
            <p class="italic text-foreground/80">
              "My father is also my coach. We established 'coach-free days' during the off-season where we only interact as father and daughter, with no training talk allowed."
              <span class="block text-foreground/60 mt-1 not-italic">— Elite Gymnast</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    
    <h2>The Goal-Setting Paradox</h2>
    <p>Athletes are typically highly goal-oriented individuals, using clear performance targets to drive motivation and focus. The off-season creates a paradox: how to set meaningful goals in a period specifically designed to step back from performance metrics.<sup><a href="#ref-1">1</a></sup></p>
    
    <div class="my-8 grid grid-cols-1 md:grid-cols-2 gap-8">
      <div class="card p-6 shadow-sm hover:shadow-md transition-all">
        <h3 class="text-xl font-semibold mb-4 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-[var(--primary)] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          Process-Oriented Mental Goals
        </h3>
        <p class="text-foreground/70 mb-4">Instead of focusing on performance outcomes, elite athletes shift to process-oriented mental goals during the off-season.</p>
        <div class="bg-[var(--background-alt)] p-4 rounded-lg">
          <h4 class="font-medium mb-2">Examples:</h4>
          <ul class="space-y-2">
            <li class="flex items-start">
              <svg class="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
              </svg>
              <span>"Practice mindfulness meditation 5 times per week for 10 minutes"</span>
            </li>
            <li class="flex items-start">
              <svg class="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
              </svg>
              <span>"Complete a daily gratitude journal focusing on non-performance aspects of life"</span>
            </li>
            <li class="flex items-start">
              <svg class="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
              </svg>
              <span>"Develop and practice a new pre-performance routine twice weekly"</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div class="card p-6 shadow-sm hover:shadow-md transition-all">
        <h3 class="text-xl font-semibold mb-4 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-[var(--primary)] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Identity Development Goals
        </h3>
        <p class="text-foreground/70 mb-4">The off-season provides a unique opportunity to set goals related to identity development beyond athletics.</p>
        <div class="bg-[var(--background-alt)] p-4 rounded-lg">
          <h4 class="font-medium mb-2">Examples:</h4>
          <ul class="space-y-2">
            <li class="flex items-start">
              <svg class="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
              </svg>
              <span>"Take one college course toward future career interests"</span>
            </li>
            <li class="flex items-start">
              <svg class="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
              </svg>
              <span>"Volunteer weekly in a community organization unrelated to sports"</span>
            </li>
            <li class="flex items-start">
              <svg class="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
              </svg>
              <span>"Develop one non-athletic hobby or skill with weekly practice"</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    
    <div class="my-8 p-6 bg-[var(--primary)]/5 rounded-xl">
      <h3 class="text-xl font-semibold mb-4">The MAPS Goal-Setting Framework for Off-Season</h3>
      <p class="mb-6 text-foreground/80">
        Sport psychologists recommend the MAPS framework specifically designed for off-season mental goals:
      </p>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-white dark:bg-[var(--background-alt)] p-4 rounded-lg">
          <div class="flex items-center mb-3">
            <div class="w-8 h-8 rounded-full bg-[var(--primary)] text-white flex items-center justify-center font-bold mr-3">M</div>
            <h4 class="font-semibold">Meaningful</h4>
          </div>
          <p class="text-foreground/70 text-sm">
            Goals should connect to your core values and long-term vision, not just short-term performance. Ask: "Why does this matter to me beyond my sport?"
          </p>
        </div>
        
        <div class="bg-white dark:bg-[var(--background-alt)] p-4 rounded-lg">
          <div class="flex items-center mb-3">
            <div class="w-8 h-8 rounded-full bg-[var(--primary)] text-white flex items-center justify-center font-bold mr-3">A</div>
            <h4 class="font-semibold">Autonomous</h4>
          </div>
          <p class="text-foreground/70 text-sm">
            Goals should be self-chosen, not imposed by coaches or others. This builds intrinsic motivation during a period when external accountability is reduced.
          </p>
        </div>
        
        <div class="bg-white dark:bg-[var(--background-alt)] p-4 rounded-lg">
          <div class="flex items-center mb-3">
            <div class="w-8 h-8 rounded-full bg-[var(--primary)] text-white flex items-center justify-center font-bold mr-3">P</div>
            <h4 class="font-semibold">Process-Focused</h4>
          </div>
          <p class="text-foreground/70 text-sm">
            Goals should emphasize actions and behaviors within your control, not outcomes or comparisons to others.
          </p>
        </div>
        
        <div class="bg-white dark:bg-[var(--background-alt)] p-4 rounded-lg">
          <div class="flex items-center mb-3">
            <div class="w-8 h-8 rounded-full bg-[var(--primary)] text-white flex items-center justify-center font-bold mr-3">S</div>
            <h4 class="font-semibold">Sustainable</h4>
          </div>
          <p class="text-foreground/70 text-sm">
            Goals should be realistic given your off-season circumstances, including travel, family commitments, and recovery needs.
          </p>
        </div>
      </div>
    </div>
    
    <h2>Case Study: Inside an Olympic Athlete's Off-Season Mental Approach</h2>
    
    <div class="my-8 bg-white dark:bg-[var(--background-alt)]/50 p-8 rounded-lg border border-foreground/5 shadow-sm">
      <div class="flex flex-col md:flex-row gap-6">
        <div class="md:w-1/3">
          <div class="aspect-w-1 aspect-h-1 rounded-full overflow-hidden bg-[var(--primary)]/10 mb-4">
            <img src="/blog/olympic-swimmer-portrait.jpg" alt="Olympic Swimmer Michael" class="object-cover" />
          </div>
          <div class="text-center">
            <h3 class="font-semibold text-lg">Michael C.</h3>
            <p class="text-foreground/70 text-sm">Olympic Gold Medalist, Swimming</p>
            <p class="text-foreground/60 text-xs mt-1">3-time Olympian</p>
          </div>
        </div>
        
        <div class="md:w-2/3">
          <h3 class="text-xl font-semibold mb-4">Michael's Off-Season Mental Strategy</h3>
          
          <div class="mb-4">
            <h4 class="font-medium mb-1">The Challenge</h4>
            <p class="text-foreground/70 text-sm">
              "After my second Olympics, I hit a wall during the off-season. I'd been so focused on the Games for four years that when it ended, I felt completely lost. I slept too much, lost motivation to train, and started questioning if I wanted to continue swimming. It was actually more stressful than the competition itself."
            </p>
          </div>
          
          <div class="mb-4">
            <h4 class="font-medium mb-1">The Approach</h4>
            <p class="text-foreground/70 text-sm">
              Working with his sport psychologist, Michael developed a structured off-season mental training plan with three distinct phases:
            </p>
            <ol class="mt-2 space-y-2 text-sm text-foreground/70">
              <li class="flex items-start">
                <span class="font-bold mr-2">1.</span>
                <span><strong>Decompression Phase (2 weeks):</strong> Complete mental and physical break from swimming. Focus on sleep, nutrition, and reconnecting with family and friends.</span>
              </li>
              <li class="flex items-start">
                <span class="font-bold mr-2">2.</span>
                <span><strong>Reflection Phase (3 weeks):</strong> Structured evaluation of the previous season, including journaling about successes, challenges, and lessons learned.</span>
              </li>
              <li class="flex items-start">
                <span class="font-bold mr-2">3.</span>
                <span><strong>Renewal Phase (8 weeks):</strong> Gradual reintroduction of mental training with an emphasis on fundamentals and exploration of new techniques.</span>
              </li>
            </ol>
          </div>
          
          <div>
            <h4 class="font-medium mb-1">The Results</h4>
            <p class="text-foreground/70 text-sm">
              "The structured approach transformed my off-season experience. Instead of feeling lost, I felt purposeful. I actually looked forward to the off-season as a time to grow in different ways. Most importantly, I returned to training mentally refreshed and with new perspectives that ultimately improved my performance."
            </p>
          </div>
        </div>
      </div>
    </div>
    
    <h2>Practical Strategies: The Off-Season Mental Toolkit</h2>
    <p>Based on research and elite athlete experiences, here are specific mental techniques that can help navigate the unique challenges of the off-season while maintaining psychological readiness for the next competitive cycle.<sup><a href="#ref-1">1</a></sup><sup><a href="#ref-3">3</a></sup></p>
    
    <div class="my-8 grid grid-cols-1 md:grid-cols-2 gap-8">
      <div class="bg-white dark:bg-[var(--background-alt)]/50 p-6 rounded-lg border border-foreground/5 shadow-sm">
        <h3 class="text-xl font-semibold mb-4">Identity Expansion Exercise</h3>
        <p class="text-foreground/70 mb-4">
          This exercise helps athletes develop a more multidimensional sense of self beyond their athletic identity.
        </p>
        <div class="bg-[var(--background-alt)]/50 p-4 rounded-lg mb-4">
          <h4 class="font-medium mb-2 text-sm">How to Practice:</h4>
          <ol class="list-decimal pl-5 space-y-2 text-sm text-foreground/70">
            <li>Create a list of 10 statements that begin with "I am..." (e.g., "I am a swimmer")</li>
            <li>Review your list and count how many statements relate directly to your sport</li>
            <li>Challenge yourself to create 5 new "I am..." statements that have nothing to do with athletics</li>
            <li>Each week of the off-season, add one new non-athletic identity statement to your list</li>
            <li>Actively pursue experiences that reinforce these expanded identity elements</li>
          </ol>
        </div>
        <div class="text-sm text-foreground/60 italic">
          "This exercise was eye-opening. I realized 8 of my 10 statements were about being a basketball player. By the end of the off-season, I had a much more balanced view of myself." — Professional Basketball Player
        </div>
      </div>
      
      <div class="bg-white dark:bg-[var(--background-alt)]/50 p-6 rounded-lg border border-foreground/5 shadow-sm">
        <h3 class="text-xl font-semibold mb-4">Periodized Mindfulness Practice</h3>
        <p class="text-foreground/70 mb-4">
          This approach adapts mindfulness training to the different phases of the off-season, balancing recovery and growth.
        </p>
        <div class="bg-[var(--background-alt)]/50 p-4 rounded-lg mb-4">
          <h4 class="font-medium mb-2 text-sm">How to Practice:</h4>
          <ul class="space-y-3 text-sm text-foreground/70">
            <li class="flex items-start">
              <span class="font-bold mr-2">Early Off-Season:</span>
              <span>Body scan meditations (10-15 min) focusing on physical recovery and tension release</span>
            </li>
            <li class="flex items-start">
              <span class="font-bold mr-2">Mid Off-Season:</span>
              <span>Open awareness practices (15-20 min) exploring thoughts and emotions without judgment</span>
            </li>
            <li class="flex items-start">
              <span class="font-bold mr-2">Late Off-Season:</span>
              <span>Focused attention exercises (10-15 min) building concentration and performance-relevant focus</span>
            </li>
          </ul>
        </div>
        <div class="text-sm text-foreground/60 italic">
          "The different types of mindfulness for different phases kept the practice fresh and relevant. I noticed my mind getting sharper as I moved through the progression." — Professional Tennis Player
        </div>
      </div>
      
      <div class="bg-white dark:bg-[var(--background-alt)]/50 p-6 rounded-lg border border-foreground/5 shadow-sm">
        <h3 class="text-xl font-semibold mb-4">Relationship Communication Plan</h3>
        <p class="text-foreground/70 mb-4">
          This structured approach helps athletes maintain healthy relationships with coaches, teammates, and family during the off-season.
        </p>
        <div class="bg-[var(--background-alt)]/50 p-4 rounded-lg mb-4">
          <h4 class="font-medium mb-2 text-sm">How to Implement:</h4>
          <ol class="list-decimal pl-5 space-y-2 text-sm text-foreground/70">
            <li>Create a communication calendar specifying when you'll connect with key people in your athletic life</li>
            <li>Set clear expectations about communication frequency and content with coaches and teammates</li>
            <li>Establish boundaries between "athletic relationship" conversations and personal connections</li>
            <li>Schedule regular check-ins with family members about their expectations and needs</li>
            <li>Create transition rituals when switching between athletic and non-athletic social contexts</li>
          </ol>
        </div>
        <div class="text-sm text-foreground/60 italic">
          "Having a plan eliminated the guilt I felt about not staying in constant contact with my coach, while also ensuring we didn't lose our connection completely." — Olympic Track Athlete
        </div>
      </div>
      
      <div class="bg-white dark:bg-[var(--background-alt)]/50 p-6 rounded-lg border border-foreground/5 shadow-sm">
        <h3 class="text-xl font-semibold mb-4">Values-Based Goal Setting</h3>
        <p class="text-foreground/70 mb-4">
          This approach helps athletes set meaningful off-season goals aligned with their core values rather than performance metrics.
        </p>
        <div class="bg-[var(--background-alt)]/50 p-4 rounded-lg mb-4">
          <h4 class="font-medium mb-2 text-sm">How to Implement:</h4>
          <ol class="list-decimal pl-5 space-y-2 text-sm text-foreground/70">
            <li>Identify 3-5 core values that are important to you beyond athletic achievement</li>
            <li>For each value, define what "living this value" would look like during the off-season</li>
            <li>Create 1-2 specific, measurable goals for each value</li>
            <li>Establish a weekly reflection practice to assess alignment with these values</li>
            <li>Adjust goals based on what you learn about yourself through this process</li>
          </ol>
        </div>
        <div class="text-sm text-foreground/60 italic">
          "I identified 'creativity' as a core value I never got to express during the season. My off-season goal became taking a photography class, which ended up becoming a serious passion." — Professional Soccer Player
        </div>
      </div>
    </div>
    
    <div class="my-8 p-6 bg-[var(--primary)]/5 rounded-xl">
      <div class="flex flex-col md:flex-row items-center gap-6">
        <div class="w-16 h-16 md:w-20 md:h-20 flex-shrink-0 rounded-full bg-[var(--primary)]/10 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        <div>
          <h4 class="text-lg font-semibold mb-2">TherapyKin Athletes: Off-Season Support</h4>
          <p class="text-foreground/80">TherapyKin Athletes offers specialized support for navigating the psychological challenges of the off-season. Our platform adapts to your specific off-season phase, providing tailored mental skills development while respecting your recovery needs.</p>
          <a href="/chat?specialist=athletes&mode=offseason" class="inline-block mt-4 px-4 py-2 bg-[var(--primary)] text-white rounded-full text-sm font-medium hover:bg-opacity-90 transition-all">Try Off-Season Support Mode</a>
        </div>
      </div>
    </div>
    
    <h2>Conclusion: The Off-Season Advantage</h2>
    <p>The psychological off-season represents both a challenge and an opportunity for elite athletes. Those who approach this period with the same intentionality they bring to physical training can transform potential pitfalls into competitive advantages.</p>
    
    <p>By addressing identity development, balancing mental recovery with growth, recalibrating relationships, and setting meaningful non-performance goals, athletes can use the off-season to build psychological resources that pay dividends when competition resumes.</p>
    
    <p>Perhaps most importantly, mastering the mental game between games creates resilience that extends beyond sport—preparing athletes not just for the next season, but for the inevitable transition to life after competitive athletics.</p>
    
    <div class="my-8 p-6 border border-[var(--primary)]/20 rounded-xl">
      <div class="flex items-start">
        <div class="w-12 h-12 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mr-4 flex-shrink-0 text-[var(--primary)]">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <div>
          <h4 class="text-lg font-semibold mb-2">Final Insight</h4>
          <p class="text-foreground/80">
            The true measure of an athlete's mental game isn't just how they perform under the spotlight—it's how they approach the quiet moments between competitions. In those spaces, champions are developing the psychological foundation that makes peak performance possible when it counts.
          </p>
        </div>
      </div>
    </div>
    
    <div class="my-8">
      <h3 class="text-xl font-semibold mb-4">Ready to Transform Your Off-Season?</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <a href="/resources/athletes-offseason-workbook" class="bg-white dark:bg-[var(--background-alt)]/50 p-6 rounded-lg border border-foreground/5 shadow-sm hover:shadow-md transition-all flex items-center">
          <div class="w-12 h-12 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mr-4 flex-shrink-0 text-[var(--primary)]">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div>
            <h4 class="font-medium">Download Our Off-Season Mental Workbook</h4>
            <p class="text-sm text-foreground/70">A comprehensive guide with exercises, templates, and tracking tools</p>
          </div>
        </a>
        
        <a href="/chat?specialist=athletes" class="bg-white dark:bg-[var(--background-alt)]/50 p-6 rounded-lg border border-foreground/5 shadow-sm hover:shadow-md transition-all flex items-center">
          <div class="w-12 h-12 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mr-4 flex-shrink-0 text-[var(--primary)]">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
          <div>
            <h4 class="font-medium">Chat With a TherapyKin Athletes Specialist</h4>
            <p class="text-sm text-foreground/70">Get personalized guidance for your specific off-season challenges</p>
          </div>
        </a>
      </div>
    </div>
    
    <hr class="my-12 border-t border-foreground/10" />
    
    <div class="my-8">
      <h2 class="text-2xl font-bold mb-6">References</h2>
      <ol class="list-decimal pl-5 space-y-4">
        <li id="ref-1" class="text-sm text-foreground/70">
          Journal of Sport Psychology in Action. (2022). Psychological Periodization: A Systematic Approach to Off-Season Mental Training. <em>Vol 13</em>(2), 112-128.
        </li>
        <li id="ref-2" class="text-sm text-foreground/70">
          International Journal of Sport and Exercise Psychology. (2023). Identity Fluctuations in Elite Athletes: A Longitudinal Study. <em>Vol 21</em>(3), 345-361.
        </li>
        <li id="ref-3" class="text-sm text-foreground/70">
          Olympic Committee Sports Psychology Division. (2023). Mental Recovery Protocols for High-Performance Athletes. <em>Technical Report</em>.
        </li>
        <li id="ref-4" class="text-sm text-foreground/70">
          Sports Medicine Open. (2022). The Psychological Impact of Training Cycles on Elite Athlete Wellbeing. <em>Vol 8</em>(1), 42-58.
        </li>
      </ol>
    </div>
  `
};
