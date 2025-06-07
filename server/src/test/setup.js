// Test environment setup
import { beforeAll, afterAll, beforeEach, vi } from 'vitest'

// Mock mongoose for testing
vi.mock('mongoose', () => {
  // Create a mock Schema constructor
  const MockSchema = vi.fn().mockImplementation(() => ({
    pre: vi.fn(),
    post: vi.fn(),
    methods: {},
    statics: {},
    index: vi.fn(),
    virtual: vi.fn().mockReturnValue({
      get: vi.fn(),
      set: vi.fn()
    })
  }))
  
  MockSchema.Types = {
    ObjectId: 'ObjectId'
  }

  return {
    default: {
      connect: vi.fn().mockResolvedValue({}),
      disconnect: vi.fn().mockResolvedValue({}),
      connection: {
        readyState: 1,
        db: {
          collections: vi.fn().mockResolvedValue([])
        }
      },
      Schema: MockSchema,
      model: vi.fn().mockReturnValue({
        find: vi.fn().mockResolvedValue([]),
        findOne: vi.fn().mockResolvedValue(null),
        findById: vi.fn().mockResolvedValue(null),
        create: vi.fn().mockResolvedValue({}),
        deleteMany: vi.fn().mockResolvedValue({}),
        aggregate: vi.fn().mockResolvedValue([]),
        countDocuments: vi.fn().mockResolvedValue(0)
      })
    }
  }
})

beforeAll(async () => {
  console.log('Test environment setup completed')
})

// Clean up after all tests
afterAll(async () => {
  console.log('Test environment cleanup completed')
})

// Clean up before each test
beforeEach(async () => {
  // Reset all mocks before each test
  vi.clearAllMocks()
})
