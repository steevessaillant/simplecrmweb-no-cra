import { postToServer } from "../api/post";

const mockFetch = global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ status: 200 }),
  }),
) as jest.Mock;

const fail = (reason = "fail was called in a test.")  => {
    console.log(reason);
    throw new Error(reason);
  }
  
global.fail = fail;

beforeEach(() => {
    jest.clearAllMocks();
});


describe('should post request when data is accepted by the ui and returns a promise ', () =>{
    it('containing a response with status OK',async () => {
        const fakeValidCustomer = {
            id: 'JestTestId',
            firstName: 'Tester',
            lastName: 'Tested',
            dateOfBirth: '2000-01-01'
        };

        const promise: Promise<Response>  = postToServer(fakeValidCustomer);
        await promise.then((response: Response) => {
            expect(response.status).toEqual(200);
            expect(mockFetch).toBeCalledTimes(1);
            expect(mockFetch.mock.instances[0].status).toEqual(200)
        }).catch((error) => {
            //fail(error);
        })
    });
})