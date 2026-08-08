###PROMPTS###

here, 1 thoguhtful idea should be that it contains level of students learning like intermediate begginner or pro/master that goes on improving after continuous streak  and acc to that give streak questions 
you have to see all these details for this competition and then gimme a roadmap to follow to make it like which tech to use for it all the stagees 
keep in mind journey should use free tools nogt paid

----

Hackathon Rules and Evaluation Process
To ensure a fair competition, every submission goes through a four-stage evaluation process. Automated verification is completed before judging so that judges only review valid submissions.
1
Stage 1: Eligibility Verification
Automatic Verification | Pass / Fail
All submissions are automatically verified during submission and rechecked after the submission deadline.
A submission must satisfy all of the following requirements:

* Repository must be publicly accessible.
* Repository URL must be valid and accessible.
* Live Demo URL must be functional and return a working application.
* AI Usage Log must be included and accessible.
* Submission must belong to a registered team.
* Submission must be received before the official deadline.

Any submission that fails one or more of the above requirements will not proceed to judging.
2
Stage 2: Authenticity Review
Automated Analysis + Manual Review
This stage verifies that the project was genuinely created during the hackathon.
The following indicators may trigger a manual review or even disqualification:

* Repository was created before the official hackathon kickoff.
* The first commit already contains most of the project, indicating an imported codebase.
* Commit history shows little or no development activity during the hackathon, followed by a large final commit.
* The AI Usage Log does not reasonably correspond to the implemented features.
* Prompt history appears incomplete, generic, or unrelated to the submitted project.

3
Stage 3: Project Judging
Two Independent Judges | 100 Points
Eligible submissions are evaluated independently by the judges using the published judging rubric.

* Each judge scores the project separately.
* Judges do not see each other's scores.
* The final score is the average of both judges' scores.
* If the difference between the two scores exceeds 15 points, a third judge will evaluate the project.
* In such cases, the median score of the three judges becomes the final score.

Only submissions that successfully complete Stages 1 and 2 are evaluated by judges.
4
Stage 4: Live Steer Challenge
Final Round | Top 6 Teams
The six highest-scoring teams qualify for the Live Steer Challenge.
Each finalist team will:

* Join a live video call.
* Share their screen throughout the challenge.
* Receive the same previously unseen feature request.
* Implement the feature within 20 minutes using their own repository.
* Use any AI tools they used during the hackathon.

The Live Steer Challenge ensures that finalists can demonstrate the same AI-assisted development skills used throughout the hackathon.
All verification and judging decisions made by the organizers are final.


see these rules tooo that are to be followed
acc to it make the pdf now with instructions of thises

----

Ok so now i Need a data.json 
for mock data, no real backend allowed anyway. Structure: a student object 
(name, streak, level, completion %), a levelThresholds object mapping 
streak days to level (Beginner(0day) /Intermediate(7 days) /Pro(21 days)), and a days array for 
60 days each with day number, level, task, status.

Also gimme a getLevel(streak) helper fn that reads from levelThresholds 
so I'm not hardcoding "Beginner"/"Intermediate" strings everywhere in the 
components later.

Make sure day 1 starts as pending with streak 0 (need this for the empty/
first-day state), and add at least one day marked "missed" so I can build 
the missed-day UI against real data instead of guessing.

----

ok now build the landing page for it in a way that its for a student who's never heard of ABTalkslanding shows 60-day coding challenge for new comers, they pick a track and know a lot baout it. Need: short hero explaining this in one line, why it matters, and a clear "Start your streak" CTA to attract users.

----

Now build dashboard using the data.json I set up earlier. get streak info from there student.level, student.completion. Need is: streak counter, today's task card (pull from days array using current day), overall progress bar, completion %, and a level badge (Beginner/Intermediate/Pro) with a small progress-to-next-level bar using getLevel() and levelThresholds. This is the main screen so make the 
level badge visually prominent, not just a small tag somewhere.


----

Build /day/[id] as a dynamic route so /day/12 works. Show that day's task from data.json, a short "what to build" section, and two submission inputs GitHub repo/commit link and LinkedIn post URL. On submit just update localStorage to mark the day done, no backend as this is a hackathon with mocked data only. 


----

