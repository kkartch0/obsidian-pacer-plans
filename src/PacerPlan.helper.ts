export function GetEndPoint(
    {
        currentPoint,
        wholePointsPerDay,
        remainingExtraPoints,
        totalPoints
    }: {
        currentPoint: number;
        wholePointsPerDay: number;
        remainingExtraPoints: number;
        totalPoints: number;
    }
): number {
    let endPoint = currentPoint + wholePointsPerDay - 1;
    endPoint += remainingExtraPoints > 0 ? 1 : 0;
    endPoint = Math.min(endPoint, totalPoints);
    return endPoint;
}
