import AppError from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateProviderService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProviderService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfile = new UpdateProviderService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'iTest',
      email: 'iTest@gmail.com',
      password: '654321',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'updatedNameTest',
      email: 'updatedNameTest@gmail.com',
    });

    expect(updatedUser.name).toBe('updatedNameTest');
    expect(updatedUser.email).toBe('updatedNameTest@gmail.com');
  });

  it('should not be able to update by an already used email', async () => {
    await fakeUsersRepository.create({
      name: 'iTest',
      email: 'iTest@gmail.com',
      password: '654321',
    });

    const user = await fakeUsersRepository.create({
      name: 'iTest2',
      email: 'teste@gmail.com',
      password: '654321',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'updatedNameTest',
        email: 'iTest@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'iTest',
      email: 'iTest@gmail.com',
      password: '654321',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'updatedNameTest',
      email: 'updatedNameTest@gmail.com',
      old_password: '654321',
      password: '123123',
    });

    expect(updatedUser.password).toBe('123123');
  });

  it('should not be able to update the password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'iTest',
      email: 'iTest@gmail.com',
      password: '654321',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'updatedNameTest',
        email: 'updatedNameTest@gmail.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'iTest',
      email: 'iTest@gmail.com',
      password: '654321',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'updatedNameTest',
        email: 'updatedNameTest@gmail.com',
        old_password: 'wrongOldPassword',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
