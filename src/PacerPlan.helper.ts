export function getEndPoint(
    {
        currentPoint,
        wholePointsPerDay,
        remainingExtraPoints,
        endNumber
    }: {
        currentPoint: number;
        wholePointsPerDay: number;
        remainingExtraPoints: number;
        endNumber: number;
    }
): number {
    let endPoint = currentPoint + wholePointsPerDay - 1;
    endPoint += remainingExtraPoints > 0 ? 1 : 0;
    endPoint = Math.min(endPoint, endNumber);
    return endPoint;
}
