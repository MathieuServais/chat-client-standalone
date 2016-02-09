import {
  describe, it, expect, inject, injectAsync, beforeEach, TestComponentBuilder,
  ComponentFixture, beforeEachProviders, setBaseTestProviders
} from "angular2/testing";
import {
  TEST_BROWSER_PLATFORM_PROVIDERS,
  TEST_BROWSER_APPLICATION_PROVIDERS,
} from "angular2/platform/testing/browser";

import {MessageAddComponent} from "./message-add.component";
import {MessageService} from "./message.service";

describe("MessageAddComponent", () => {
  let fixture: ComponentFixture;

  setBaseTestProviders(TEST_BROWSER_PLATFORM_PROVIDERS,
                       TEST_BROWSER_APPLICATION_PROVIDERS);

  beforeEachProviders(() => [MessageService]);

  beforeEach(injectAsync([TestComponentBuilder], tcb =>
    tcb.createAsync(MessageAddComponent).then(f => fixture = f)
  ));

  it("should send a message", () => {
    // Todo need doc exemple
  });
});