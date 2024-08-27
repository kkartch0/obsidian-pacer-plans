export function GetEndPoint(
    {
        currentPoint,
        wholePointsPerDay,
        remainingExtraPoints,
        totalQuantity
    }: {
        currentPoint: number;
        wholePointsPerDay: number;
        remainingExtraPoints: number;
        totalQuantity: number;
    }
): number {
    let endPoint = currentPoint + wholePointsPerDay - 1;
    endPoint += remainingExtraPoints > 0 ? 1 : 0;
    endPoint = Math.min(endPoint, totalQuantity);
    return endPoint;
}
