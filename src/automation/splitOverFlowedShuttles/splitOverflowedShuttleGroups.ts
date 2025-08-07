import { ExpandedShuttleRequest } from "../types/expandShuttleReq";


const MAX_PEOPLE_PER_SHUTTLE = 19;

function splitOverflowedShuttleGroups(
  shuttleGroups: ExpandedShuttleRequest[][]
): ExpandedShuttleRequest[][] {
  const validGroups: ExpandedShuttleRequest[][] = [];
  const overflowGroups: ExpandedShuttleRequest[][] = [];

  // חלוקה לקבוצות תקינות וחריגות
  for (const group of shuttleGroups) {
    if (group.length <= MAX_PEOPLE_PER_SHUTTLE) {
      validGroups.push(group);
    } else {
      overflowGroups.push(group);
    }
  }

  const finalGroups: ExpandedShuttleRequest[][] = [...validGroups];

  for (const group of overflowGroups) {
    const peopleCount = group.length;

    // חישוב כמות קבוצות הדרושה  
    const numNewGroups = Math.max(Math.ceil(peopleCount / MAX_PEOPLE_PER_SHUTTLE), 3);
    

    // חישוב כמות האנשים לכל קבוצה חדשה (באופן שווה יחסית)
    const avgPeopleInShuttle = Math.floor(peopleCount / numNewGroups) + Math.min(peopleCount % numNewGroups, 1);

    let currGroup: ExpandedShuttleRequest[] = [];

    for (let i = 0; i < peopleCount; i++) {
      const request = group[i];

      // כל avgPeopleInShuttle נוסעים יוצרים קבוצה חדשה
      if (i % avgPeopleInShuttle === 0 && i !== 0) {
        finalGroups.push(currGroup);
        currGroup = [];
      }

      currGroup.push(request);
    }

    // הוספת הקבוצה האחרונה אם נשארה
    if (currGroup.length > 0) {
      finalGroups.push(currGroup);
    }
  }

  return finalGroups;
}
export default splitOverflowedShuttleGroups;