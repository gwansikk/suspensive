import { increase } from '@suspensive/utils'
import {
  type PropsWithChildren,
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react'
import { useIsChanged } from './hooks'
import {
  Message_useErrorBoundaryGroup_this_hook_should_be_called_in_ErrorBoundary_props_children,
  SuspensiveError,
} from './models/SuspensiveError'

export const ErrorBoundaryGroupContext = createContext<{ reset: () => void; resetKey: number } | undefined>(undefined)
if (process.env.NODE_ENV === 'development') {
  ErrorBoundaryGroupContext.displayName = 'ErrorBoundaryGroupContext'
}

export interface ErrorBoundaryGroupProps extends PropsWithChildren {
  /**
   * If you use blockOutside as true, ErrorBoundaryGroup will protect multiple ErrorBoundaries as its children from external ErrorBoundaryGroup's resetKey
   * @default false
   */
  blockOutside?: boolean
}

/**
 * ErrorBoundaryGroup is Component to manage multiple ErrorBoundaries
 * @see {@link https://suspensive.org/docs/react/ErrorBoundaryGroup}
 */
export const ErrorBoundaryGroup = Object.assign(
  (() => {
    const ErrorBoundaryGroup = ({ blockOutside = false, children }: ErrorBoundaryGroupProps) => {
      const [resetKey, reset] = useReducer(increase, 0)
      const parentGroup = useContext(ErrorBoundaryGroupContext)
      const isParentGroupResetKeyChanged = useIsChanged(parentGroup?.resetKey)

      useEffect(() => {
        if (!blockOutside && isParentGroupResetKeyChanged) {
          reset()
        }
      }, [isParentGroupResetKeyChanged, blockOutside])

      const value = useMemo(() => ({ reset, resetKey }), [resetKey])

      return <ErrorBoundaryGroupContext.Provider value={value}>{children}</ErrorBoundaryGroupContext.Provider>
    }
    if (process.env.NODE_ENV === 'development') {
      ErrorBoundaryGroup.displayName = 'ErrorBoundaryGroup'
    }

    return ErrorBoundaryGroup
  })(),
  {
    Consumer: ({
      children,
    }: {
      children: (errorBoundaryGroup: ReturnType<typeof useErrorBoundaryGroup>) => ReactNode
    }) => <>{children(useErrorBoundaryGroup())}</>,
  }
)

export const useErrorBoundaryGroup = () => {
  const group = useContext(ErrorBoundaryGroupContext)
  SuspensiveError.assert(
    group != null,
    Message_useErrorBoundaryGroup_this_hook_should_be_called_in_ErrorBoundary_props_children
  )
  return useMemo(
    () => ({
      /**
       * When you want to reset multiple ErrorBoundaries as children of ErrorBoundaryGroup, You can use this reset
       */
      reset: group.reset,
    }),
    [group.reset]
  )
}
