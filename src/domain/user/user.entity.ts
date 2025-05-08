import { AggregateRoot } from '@nestjs/cqrs';

export class User extends AggregateRoot {
  private readonly id: string;
  private email: string;
  private name: string;
  private createdAt: Date;

  constructor(id: string, email: string, name: string) {
    super();
    this.id = id;
    this.email = email;
    this.name = name;
    this.createdAt = new Date();
  }

  // Getters
  getId(): string {
    return this.id;
  }

  getEmail(): string {
    return this.email;
  }

  getName(): string {
    return this.name;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  // Domain methods
  updateName(newName: string): void {
    this.name = newName;
    this.apply(new UserNameUpdated(this.id, newName));
  }

  updateEmail(newEmail: string): void {
    this.email = newEmail;
    this.apply(new UserEmailUpdated(this.id, newEmail));
  }
}

class UserNameUpdated {
  constructor(
    public readonly userId: string,
    public readonly newName: string,
  ) {}
}

class UserEmailUpdated {
  constructor(
    public readonly userId: string,
    public readonly newEmail: string,
  ) {}
}
