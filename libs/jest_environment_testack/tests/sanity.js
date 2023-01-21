describe('jest environment', () => {
  
  it('should have a `Testack` instance', function() {
    expect(global.testack.providers["MongoDB"]).toMatchObject({
      reset: expect.any(Function),
      url: undefined,
      username: undefined,
      password: undefined
    });
  }); 

  it('Testack object exists', () => {
    const logSpy = jest.spyOn(global.console, 'log');
    expect(global.testack.providers["MongoDB"].reset()).toBe(true);
  });
});
