/**
 * Ohio DMV Test Questions - 40 Question Format
 * 20 Road Signs + 20 Traffic Rules
 */

const QUESTIONS = [
  // Road Signs (20 questions)
  {
    id: 'sign-001',
    category: 'road-signs',
    subcategory: 'regulatory-signs',
    difficulty: 'easy',
    text: 'What does a red octagon-shaped sign mean?',
    image_url: null,
    options: [
      { id: 'a', text: 'Stop - you must come to a complete stop', correct: true },
      { id: 'b', text: 'Yield to oncoming traffic', correct: false },
      { id: 'c', text: 'Prepare to slow down', correct: false },
      { id: 'd', text: 'One way ahead', correct: false }
    ],
    explanation: 'A red octagon-shaped sign is a stop sign. You must come to a complete stop and check for traffic before proceeding.'
  },
  {
    id: 'sign-002',
    category: 'road-signs',
    subcategory: 'regulatory-signs',
    difficulty: 'easy',
    text: 'What does a yellow triangle warning sign mean?',
    image_url: null,
    options: [
      { id: 'a', text: 'Mandatory instruction', correct: false },
      { id: 'b', text: 'Warning of a hazard ahead', correct: true },
      { id: 'c', text: 'Do not enter', correct: false },
      { id: 'd', text: 'Speed limit ahead', correct: false }
    ],
    explanation: 'Yellow triangle warning signs alert drivers to potential hazards such as curves, intersections, or other dangers ahead.'
  },
  {
    id: 'sign-003',
    category: 'road-signs',
    subcategory: 'regulatory-signs',
    difficulty: 'medium',
    text: 'What does a white rectangular sign mean?',
    image_url: null,
    options: [
      { id: 'a', text: 'Warning of danger', correct: false },
      { id: 'b', text: 'Regulatory instruction or requirement', correct: true },
      { id: 'c', text: 'Information or direction', correct: false },
      { id: 'd', text: 'Speed recommendation', correct: false }
    ],
    explanation: 'White rectangular signs convey regulatory requirements and instructions that drivers must obey, such as speed limits and parking rules.'
  },
  {
    id: 'sign-004',
    category: 'road-signs',
    subcategory: 'guide-signs',
    difficulty: 'easy',
    text: 'What does a green rectangular sign indicate?',
    image_url: null,
    options: [
      { id: 'a', text: 'Warning of hazard', correct: false },
      { id: 'b', text: 'Directional information or guidance', correct: true },
      { id: 'c', text: 'Mandatory instruction', correct: false },
      { id: 'd', text: 'Speed zone ahead', correct: false }
    ],
    explanation: 'Green rectangular signs provide directional information, such as highway route numbers, exit information, and distance to cities.'
  },
  {
    id: 'sign-005',
    category: 'road-signs',
    subcategory: 'regulatory-signs',
    difficulty: 'easy',
    text: 'What does a "Do Not Enter" sign look like and where is it used?',
    image_url: null,
    options: [
      { id: 'a', text: 'Red rectangular sign at the entrance of one-way roads', correct: true },
      { id: 'b', text: 'White octagon at intersections', correct: false },
      { id: 'c', text: 'Yellow triangle warning', correct: false },
      { id: 'd', text: 'Blue rectangular guide sign', correct: false }
    ],
    explanation: 'A "Do Not Enter" sign is a red rectangular sign used at entrances to one-way roads and divided highways. You must not enter.'
  },
  {
    id: 'sign-006',
    category: 'road-signs',
    subcategory: 'warning-signs',
    difficulty: 'medium',
    text: 'What does a yellow and black diamond sign with two curves indicate?',
    image_url: null,
    options: [
      { id: 'a', text: 'Low clearance ahead', correct: false },
      { id: 'b', text: 'Winding road ahead', correct: true },
      { id: 'c', text: 'Pedestrian crossing', correct: false },
      { id: 'd', text: 'Speed limit change', correct: false }
    ],
    explanation: 'A yellow and black diamond sign with curves warns drivers of a winding road ahead. Reduce speed and be prepared to turn.'
  },
  {
    id: 'sign-007',
    category: 'road-signs',
    subcategory: 'warning-signs',
    difficulty: 'easy',
    text: 'What does a yellow diamond sign with a pedestrian symbol mean?',
    image_url: null,
    options: [
      { id: 'a', text: 'Pedestrian crossing area ahead - be prepared to stop', correct: true },
      { id: 'b', text: 'Pedestrians prohibited', correct: false },
      { id: 'c', text: 'School zone speed limit', correct: false },
      { id: 'd', text: 'Bike path crossing', correct: false }
    ],
    explanation: 'A yellow diamond sign with a pedestrian crossing symbol warns drivers that pedestrians may be crossing ahead. Reduce speed and be ready to stop.'
  },
  {
    id: 'sign-008',
    category: 'road-signs',
    subcategory: 'regulatory-signs',
    difficulty: 'medium',
    text: 'What does a "Yield" sign look like?',
    image_url: null,
    options: [
      { id: 'a', text: 'Red octagon', correct: false },
      { id: 'b', text: 'White triangle with red border', correct: true },
      { id: 'c', text: 'Yellow diamond', correct: false },
      { id: 'd', text: 'Blue rectangle', correct: false }
    ],
    explanation: 'A "Yield" sign is a red and white triangle. You must slow down and be ready to stop if traffic does not allow you to proceed.'
  },
  {
    id: 'sign-009',
    category: 'road-signs',
    subcategory: 'work-zone-signs',
    difficulty: 'medium',
    text: 'What does an orange and black diamond sign indicate?',
    image_url: null,
    options: [
      { id: 'a', text: 'School zone', correct: false },
      { id: 'b', text: 'Construction or work zone ahead', correct: true },
      { id: 'c', text: 'Pedestrian area', correct: false },
      { id: 'd', text: 'Playground nearby', correct: false }
    ],
    explanation: 'Orange and black diamond signs warn of construction or work zones ahead. Reduce speed, watch for workers, and be prepared for lane changes.'
  },
  {
    id: 'sign-010',
    category: 'road-signs',
    subcategory: 'guide-signs',
    difficulty: 'easy',
    text: 'What does a blue rectangular sign indicate?',
    image_url: null,
    options: [
      { id: 'a', text: 'Mandatory instruction', correct: false },
      { id: 'b', text: 'Warning of danger', correct: false },
      { id: 'c', text: 'Service information (rest areas, gas, food, lodging)', correct: true },
      { id: 'd', text: 'Speed zone', correct: false }
    ],
    explanation: 'Blue rectangular signs provide information about services such as gas stations, rest areas, food, and lodging near the highway.'
  },
  {
    id: 'sign-011',
    category: 'road-signs',
    subcategory: 'regulatory-signs',
    difficulty: 'easy',
    text: 'What must you do at a "Stop" sign?',
    image_url: null,
    options: [
      { id: 'a', text: 'Slow down and look both ways', correct: false },
      { id: 'b', text: 'Come to a complete stop and check for traffic before proceeding', correct: true },
      { id: 'c', text: 'Honk your horn', correct: false },
      { id: 'd', text: 'Reduce speed by half', correct: false }
    ],
    explanation: 'At a stop sign, you must come to a complete stop. After ensuring the intersection is clear and safe, you may proceed.'
  },
  {
    id: 'sign-012',
    category: 'road-signs',
    subcategory: 'regulatory-signs',
    difficulty: 'medium',
    text: 'What does a "No Parking" sign indicate?',
    image_url: null,
    options: [
      { id: 'a', text: 'You may park during certain hours', correct: false },
      { id: 'b', text: 'Parking is prohibited in this area', correct: true },
      { id: 'c', text: 'Parking is limited to 30 minutes', correct: false },
      { id: 'd', text: 'Only permitted vehicles may park', correct: false }
    ],
    explanation: 'A "No Parking" sign prohibits parking in that area. Violating this sign may result in a ticket or towing.'
  },
  {
    id: 'sign-013',
    category: 'road-signs',
    subcategory: 'warning-signs',
    difficulty: 'medium',
    text: 'What does a yellow diamond sign with an animal symbol mean?',
    image_url: null,
    options: [
      { id: 'a', text: 'Pets are allowed in the area', correct: false },
      { id: 'b', text: 'Wildlife may cross the road ahead', correct: true },
      { id: 'c', text: 'Zoo or animal facility ahead', correct: false },
      { id: 'd', text: 'No animals allowed', correct: false }
    ],
    explanation: 'A yellow diamond sign with an animal symbol warns that wildlife may cross the road. Reduce speed and be prepared to stop.'
  },
  {
    id: 'sign-014',
    category: 'road-signs',
    subcategory: 'regulatory-signs',
    difficulty: 'easy',
    text: 'What does a white sign with black text indicating "Speed Limit 55" mean?',
    image_url: null,
    options: [
      { id: 'a', text: 'The maximum legal speed on this road is 55 mph', correct: true },
      { id: 'b', text: 'The recommended speed is 55 mph', correct: false },
      { id: 'c', text: 'You must drive at least 55 mph', correct: false },
      { id: 'd', text: 'The speed limit varies by time of day', correct: false }
    ],
    explanation: 'A speed limit sign shows the maximum legal speed for that road. You must not exceed this speed, even if conditions seem safe.'
  },
  {
    id: 'sign-015',
    category: 'road-signs',
    subcategory: 'regulatory-signs',
    difficulty: 'medium',
    text: 'What does a black and white divided sign mean (like a split circle)?',
    image_url: null,
    options: [
      { id: 'a', text: 'Divided highway begins', correct: true },
      { id: 'b', text: 'Two-way traffic ahead', correct: false },
      { id: 'c', text: 'No passing zone', correct: false },
      { id: 'd', text: 'End of divided highway', correct: false }
    ],
    explanation: 'A black and white divided highway sign indicates that the highway ahead is divided. Oncoming traffic will be separated by a median.'
  },
  {
    id: 'sign-016',
    category: 'road-signs',
    subcategory: 'warning-signs',
    difficulty: 'medium',
    text: 'What does a yellow diamond sign with an arrow pointing upward at an angle mean?',
    image_url: null,
    options: [
      { id: 'a', text: 'Hill or steep grade ahead', correct: true },
      { id: 'b', text: 'Uphill traffic only', correct: false },
      { id: 'c', text: 'Reduce speed immediately', correct: false },
      { id: 'd', text: 'Scenic overlook ahead', correct: false }
    ],
    explanation: 'A yellow diamond sign with an upward arrow warns of a hill or steep grade ahead. Be prepared to adjust speed as needed.'
  },
  {
    id: 'sign-017',
    category: 'road-signs',
    subcategory: 'guide-signs',
    difficulty: 'easy',
    text: 'What does a brown rectangular sign indicate?',
    image_url: null,
    options: [
      { id: 'a', text: 'Speed limit', correct: false },
      { id: 'b', text: 'Recreation area or historic site information', correct: true },
      { id: 'c', text: 'Construction ahead', correct: false },
      { id: 'd', text: 'Regulatory instruction', correct: false }
    ],
    explanation: 'Brown rectangular signs indicate parks, recreation areas, scenic sites, and historical points of interest.'
  },
  {
    id: 'sign-018',
    category: 'road-signs',
    subcategory: 'regulatory-signs',
    difficulty: 'medium',
    text: 'What does a red and white "Wrong Way" sign mean?',
    image_url: null,
    options: [
      { id: 'a', text: 'You may go either direction', correct: false },
      { id: 'b', text: 'You are going the wrong way - do not proceed', correct: true },
      { id: 'c', text: 'This is a one-way street in this direction', correct: false },
      { id: 'd', text: 'Turn around at the next intersection', correct: false }
    ],
    explanation: 'A "Wrong Way" sign indicates you should not proceed. You may have entered a one-way street going the wrong direction. Turn around safely.'
  },
  {
    id: 'sign-019',
    category: 'road-signs',
    subcategory: 'regulatory-signs',
    difficulty: 'easy',
    text: 'What does a white rectangular sign with "One Way" and an arrow mean?',
    image_url: null,
    options: [
      { id: 'a', text: 'The road is divided into sections', correct: false },
      { id: 'b', text: 'Traffic flows only in the direction of the arrow', correct: true },
      { id: 'c', text: 'You must make a one-turn only', correct: false },
      { id: 'd', text: 'Only one vehicle may use the road at a time', correct: false }
    ],
    explanation: 'A "One Way" sign with an arrow indicates that traffic flows only in the direction shown. Do not go against the arrow.'
  },
  {
    id: 'sign-020',
    category: 'road-signs',
    subcategory: 'warning-signs',
    difficulty: 'medium',
    text: 'What does a yellow diamond sign with an "X" mean?',
    image_url: null,
    options: [
      { id: 'a', text: 'Railroad crossing ahead', correct: true },
      { id: 'b', text: 'No crossing allowed', correct: false },
      { id: 'c', text: 'Four-way intersection', correct: false },
      { id: 'd', text: 'Pedestrian crossing zone', correct: false }
    ],
    explanation: 'A yellow diamond sign with an "X" warns of a railroad crossing ahead. Be prepared to stop for trains and look both ways.'
  },

  // Traffic Rules (20 questions)
  {
    id: 'rule-001',
    category: 'traffic-rules',
    subcategory: 'speed-limits',
    difficulty: 'easy',
    text: 'What is the maximum speed limit on residential streets in Ohio?',
    image_url: null,
    options: [
      { id: 'a', text: '25 mph', correct: true },
      { id: 'b', text: '35 mph', correct: false },
      { id: 'c', text: '45 mph', correct: false },
      { id: 'd', text: '55 mph', correct: false }
    ],
    explanation: 'The maximum speed limit on residential streets in Ohio is 25 mph unless otherwise posted. Always obey speed limit signs.'
  },
  {
    id: 'rule-002',
    category: 'traffic-rules',
    subcategory: 'right-of-way',
    difficulty: 'medium',
    text: 'You are driving straight on a road and a car is turning left in front of you. Who has the right of way?',
    image_url: null,
    options: [
      { id: 'a', text: 'The car turning left has the right of way', correct: false },
      { id: 'b', text: 'You have the right of way', correct: true },
      { id: 'c', text: 'Both vehicles should proceed at the same time', correct: false },
      { id: 'd', text: 'The right of way depends on the color of traffic lights', correct: false }
    ],
    explanation: 'A driver going straight has the right of way over a driver turning left, unless directed otherwise by traffic signals.'
  },
  {
    id: 'rule-003',
    category: 'traffic-rules',
    subcategory: 'right-of-way',
    difficulty: 'easy',
    text: 'When turning left, what must you check?',
    image_url: null,
    options: [
      { id: 'a', text: 'Only oncoming traffic', correct: false },
      { id: 'b', text: 'Only the traffic behind you', correct: false },
      { id: 'c', text: 'Oncoming traffic and pedestrians in your path', correct: true },
      { id: 'd', text: 'Only the traffic signal', correct: false }
    ],
    explanation: 'When turning left, you must yield to oncoming traffic and watch for pedestrians crossing in your path of travel.'
  },
  {
    id: 'rule-004',
    category: 'traffic-rules',
    subcategory: 'child-safety',
    difficulty: 'medium',
    text: 'At what age can a child sit in the front seat in Ohio?',
    image_url: null,
    options: [
      { id: 'a', text: '8 years old or 4\'8" tall', correct: true },
      { id: 'b', text: '5 years old', correct: false },
      { id: 'c', text: '10 years old', correct: false },
      { id: 'd', text: '12 years old', correct: false }
    ],
    explanation: 'In Ohio, children can sit in the front seat when they are at least 8 years old or 4\'8" tall, whichever comes first. Children under this age must use a rear seat and proper child restraint system.'
  },
  {
    id: 'rule-005',
    category: 'traffic-rules',
    subcategory: 'seatbelt',
    difficulty: 'easy',
    text: 'Are seatbelts required in Ohio?',
    image_url: null,
    options: [
      { id: 'a', text: 'Yes, for all occupants', correct: true },
      { id: 'b', text: 'Only for the driver', correct: false },
      { id: 'c', text: 'Only for passengers under 18', correct: false },
      { id: 'd', text: 'No, seatbelts are optional', correct: false }
    ],
    explanation: 'Yes, seatbelts are required for the driver and all passengers in Ohio. Failing to wear a seatbelt can result in a fine.'
  },
  {
    id: 'rule-006',
    category: 'traffic-rules',
    subcategory: 'impaired-driving',
    difficulty: 'medium',
    text: 'What is the legal blood alcohol content (BAC) limit for drivers under 21 in Ohio?',
    image_url: null,
    options: [
      { id: 'a', text: '0.08%', correct: false },
      { id: 'b', text: '0.04%', correct: false },
      { id: 'c', text: '0.00% (zero tolerance)', correct: true },
      { id: 'd', text: '0.10%', correct: false }
    ],
    explanation: 'Ohio has a zero-tolerance policy for drivers under 21. Any amount of alcohol detected can result in license suspension and penalties.'
  },
  {
    id: 'rule-007',
    category: 'traffic-rules',
    subcategory: 'impaired-driving',
    difficulty: 'easy',
    text: 'What is the legal blood alcohol content (BAC) limit for drivers 21 and older in Ohio?',
    image_url: null,
    options: [
      { id: 'a', text: '0.04%', correct: false },
      { id: 'b', text: '0.08%', correct: true },
      { id: 'c', text: '0.10%', correct: false },
      { id: 'd', text: '0.12%', correct: false }
    ],
    explanation: 'The legal BAC limit for drivers 21 and older in Ohio is 0.08%. Driving with a BAC of 0.08% or higher is illegal and dangerous.'
  },
  {
    id: 'rule-008',
    category: 'traffic-rules',
    subcategory: 'passing',
    difficulty: 'medium',
    text: 'When passing another vehicle, what must you do?',
    image_url: null,
    options: [
      { id: 'a', text: 'Honk your horn and move left', correct: false },
      { id: 'b', text: 'Signal, check for traffic, move left, pass safely, and signal back', correct: true },
      { id: 'c', text: 'Just move left and pass', correct: false },
      { id: 'd', text: 'Speed up and pass quickly', correct: false }
    ],
    explanation: 'When passing, always use your turn signal, check for oncoming traffic and blind spots, move left safely, pass the vehicle, and signal before returning to your lane.'
  },
  {
    id: 'rule-009',
    category: 'traffic-rules',
    subcategory: 'parking',
    difficulty: 'medium',
    text: 'Is it legal to park on the sidewalk in Ohio?',
    image_url: null,
    options: [
      { id: 'a', text: 'Yes, always', correct: false },
      { id: 'b', text: 'No, parking on sidewalks is prohibited', correct: true },
      { id: 'c', text: 'Only during the day', correct: false },
      { id: 'd', text: 'Only in certain cities', correct: false }
    ],
    explanation: 'Parking on sidewalks is prohibited in Ohio. You must park in designated parking areas only. Violating this may result in a ticket or towing.'
  },
  {
    id: 'rule-010',
    category: 'traffic-rules',
    subcategory: 'parking',
    difficulty: 'easy',
    text: 'How far from a fire hydrant must you park in Ohio?',
    image_url: null,
    options: [
      { id: 'a', text: '5 feet', correct: false },
      { id: 'b', text: '10 feet', correct: false },
      { id: 'c', text: '15 feet', correct: true },
      { id: 'd', text: '20 feet', correct: false }
    ],
    explanation: 'In Ohio, you must park at least 15 feet away from a fire hydrant to allow emergency vehicles access in case of fire.'
  },
  {
    id: 'rule-011',
    category: 'traffic-rules',
    subcategory: 'intersections',
    difficulty: 'medium',
    text: 'At a four-way stop, which vehicle has the right of way?',
    image_url: null,
    options: [
      { id: 'a', text: 'The largest vehicle', correct: false },
      { id: 'b', text: 'The vehicle on the right', correct: true },
      { id: 'c', text: 'The vehicle going straight', correct: false },
      { id: 'd', text: 'The first vehicle to arrive', correct: false }
    ],
    explanation: 'At a four-way stop, the vehicle on the right has the right of way. If two vehicles arrive at the same time from opposite directions, the vehicle going straight has priority over turning vehicles.'
  },
  {
    id: 'rule-012',
    category: 'traffic-rules',
    subcategory: 'school-zones',
    difficulty: 'medium',
    text: 'What is the speed limit in a school zone?',
    image_url: null,
    options: [
      { id: 'a', text: '15 mph', correct: true },
      { id: 'b', text: '20 mph', correct: false },
      { id: 'c', text: '25 mph', correct: false },
      { id: 'd', text: '30 mph', correct: false }
    ],
    explanation: 'The speed limit in school zones in Ohio is 15 mph. This limit is in effect during school hours and times posted on school zone signs.'
  },
  {
    id: 'rule-013',
    category: 'traffic-rules',
    subcategory: 'pedestrians',
    difficulty: 'easy',
    text: 'When a pedestrian is crossing at a marked crosswalk, what must you do?',
    image_url: null,
    options: [
      { id: 'a', text: 'Yield to the pedestrian', correct: true },
      { id: 'b', text: 'Honk your horn to warn them', correct: false },
      { id: 'c', text: 'Speed up to pass them', correct: false },
      { id: 'd', text: 'Continue at the same speed', correct: false }
    ],
    explanation: 'You must yield to pedestrians crossing at a marked crosswalk, whether or not they have a walk signal. Pedestrians always have the right of way at crosswalks.'
  },
  {
    id: 'rule-014',
    category: 'traffic-rules',
    subcategory: 'pavement-markings',
    difficulty: 'medium',
    text: 'What does a solid yellow line down the center of the road mean?',
    image_url: null,
    options: [
      { id: 'a', text: 'Passing is always allowed', correct: false },
      { id: 'b', text: 'No passing is allowed', correct: true },
      { id: 'c', text: 'Passing is allowed with caution', correct: false },
      { id: 'd', text: 'Passing is allowed only at night', correct: false }
    ],
    explanation: 'A solid yellow line means no passing is allowed. A dashed yellow line allows passing when it is safe to do so.'
  },
  {
    id: 'rule-015',
    category: 'traffic-rules',
    subcategory: 'pavement-markings',
    difficulty: 'medium',
    text: 'What does a white line between lanes mean?',
    image_url: null,
    options: [
      { id: 'a', text: 'You cannot cross the line', correct: false },
      { id: 'b', text: 'You can cross the line when it is safe', correct: true },
      { id: 'c', text: 'The line marks the edge of the road', correct: false },
      { id: 'd', text: 'You must stop at the line', correct: false }
    ],
    explanation: 'A white line between lanes indicates lanes of traffic going in the same direction. You can change lanes at a white line when it is safe to do so.'
  },
  {
    id: 'rule-016',
    category: 'traffic-rules',
    subcategory: 'headlights',
    difficulty: 'easy',
    text: 'When must you use your headlights in Ohio?',
    image_url: null,
    options: [
      { id: 'a', text: 'Only at night', correct: false },
      { id: 'b', text: 'During daylight hours and at night', correct: true },
      { id: 'c', text: 'Only during rain and fog', correct: false },
      { id: 'd', text: 'Only when visibility is poor', correct: false }
    ],
    explanation: 'You must use your headlights during daylight hours and at night in Ohio. This improves visibility and helps other drivers see you.'
  },
  {
    id: 'rule-017',
    category: 'traffic-rules',
    subcategory: 'right-of-way',
    difficulty: 'medium',
    text: 'At a yield sign, what must you do?',
    image_url: null,
    options: [
      { id: 'a', text: 'Always stop completely', correct: false },
      { id: 'b', text: 'Slow down and be ready to stop if traffic does not allow passage', correct: true },
      { id: 'c', text: 'Proceed at normal speed', correct: false },
      { id: 'd', text: 'Honk your horn and proceed', correct: false }
    ],
    explanation: 'At a yield sign, you must slow down and be prepared to stop if traffic does not permit safe passage. Unlike a stop sign, you do not have to come to a complete stop if the road is clear.'
  },
  {
    id: 'rule-018',
    category: 'traffic-rules',
    subcategory: 'following-distance',
    difficulty: 'medium',
    text: 'What is a safe following distance behind another vehicle?',
    image_url: null,
    options: [
      { id: 'a', text: 'One car length', correct: false },
      { id: 'b', text: 'At least 3 seconds of travel time', correct: true },
      { id: 'c', text: 'Just a few feet', correct: false },
      { id: 'd', text: 'There is no specific requirement', correct: false }
    ],
    explanation: 'A safe following distance is at least 3 seconds of travel time behind the vehicle in front of you. This provides time to brake if the vehicle stops suddenly.'
  },
  {
    id: 'rule-019',
    category: 'traffic-rules',
    subcategory: 'turn-signals',
    difficulty: 'easy',
    text: 'When must you signal a turn in Ohio?',
    image_url: null,
    options: [
      { id: 'a', text: 'Only in heavy traffic', correct: false },
      { id: 'b', text: 'Only during the day', correct: false },
      { id: 'c', text: 'Always when turning or changing lanes', correct: true },
      { id: 'd', text: 'Only when other vehicles are present', correct: false }
    ],
    explanation: 'You must signal all turns and lane changes in Ohio. Signaling helps other drivers anticipate your actions and reduces the risk of accidents.'
  },
  {
    id: 'rule-020',
    category: 'traffic-rules',
    subcategory: 'emergency-vehicles',
    difficulty: 'easy',
    text: 'What must you do when an emergency vehicle with lights and sirens approaches?',
    image_url: null,
    options: [
      { id: 'a', text: 'Speed up to get out of the way', correct: false },
      { id: 'b', text: 'Safely pull to the right and stop', correct: true },
      { id: 'c', text: 'Turn left to give them more room', correct: false },
      { id: 'd', text: 'Continue at your current speed', correct: false }
    ],
    explanation: 'When an emergency vehicle (ambulance, fire truck, police car) approaches with lights and sirens, you must safely pull to the right side of the road and stop.'
  }
];
