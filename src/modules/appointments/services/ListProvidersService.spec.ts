import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProvidersService;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    listProviders = new ListProvidersService(fakeUsersRepository);
  });

  it('should be able to list the providers', async () => {
    const userOne = await fakeUsersRepository.create({
      name: 'iTest',
      email: 'iTest@gmail.com',
      password: '654321',
    });

    const userTwo = await fakeUsersRepository.create({
      name: 'iTest2',
      email: 'iTest2@gmail.com',
      password: '654321',
    });

    const loggedUser = await fakeUsersRepository.create({
      name: 'iTest3',
      email: 'iTest3@gmail.com',
      password: '654321',
    });

    const providers = await listProviders.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([userOne, userTwo]);
  });
});
