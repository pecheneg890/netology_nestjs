export default (req: any, res: any) => {
    res.status(404);
    res.json('Not found');
}