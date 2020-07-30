import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateUser: AuthenticateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to authenticate', async () => {
    const user = await fakeUsersRepository.create({
      name: 'itest',
      email: 'itest@gmail.com',
      password: '123456',
    });

    const response = await authenticateUser.execute({
      email: 'itest@gmail.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not to be able to authenticate with non existing user', async () => {
    await expect(
      authenticateUser.execute({
        email: 'itest@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with a wrong password', async () => {
    await fakeUsersRepository.create({
      name: 'itest',
      email: 'itest@gmail.com',
      password: '123456',
    });

    await expect(
      authenticateUser.execute({
        email: 'itest@gmail.com',
        password: '654321',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
