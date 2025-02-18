import {
  BatteryStepper,
  Button,
  Card,
  GridItemFour,
  GridLayout,
  SelectBoxNode,
  TextArea,
  TextField,
  TextHeading3,
  ToggleElement,
} from "@eden/package-ui";
import { isEmpty, map } from "lodash";
import { useReducer } from "react";

interface ProjectData {
  username: string;
  description: string;
  selectedRole?: string;
  selectedTag?: string;
  selectedEmoji?: string;
  selectedColor?: string;
}

const initialState = {
  username: "",
  selectedRole: "",
  description: "",
};

function reducer(state: ProjectData, action: any): ProjectData {
  switch (action.type) {
    case "HANDLE PROJECT VIEW 2 TEXT":
      return {
        ...state,
        [action.field]: action.payload.value,
      };
    default:
      return state;
  }
}

export interface CreateProjectViews7Props {
  expertise?: any[];
  battery: number;
  setBattery: (level: number) => void;
  onBack: () => void;
  // eslint-disable-next-line no-unused-vars
  onNext: (data: ProjectData) => void;
}

export const CreateProjectViews7 = ({
  onBack,
  battery,
  setBattery,
  onNext,
  expertise = [],
}: CreateProjectViews7Props) => {
  const [state] = useReducer(reducer, initialState);
  const handleUpdateState = (value: any, field: string) => {
    console.log(value, field);
    // dispath({
    //   type: "HANDLE INPUT TEXT",
    //   field: field,
    //   payload: {
    //     value,
    //   },
    // });
  };

  // const { data: dataRoles } = useQuery(FIND_ROLE_TEMPLATES, {
  //   variables: {
  //     fields: {
  //       _id: null,
  //     },
  //   },
  //   context: { serviceName: "soilservice" },
  // });

  // console.log("dataRoles = ", dataRoles);

  return (
    <Card shadow className="bg-white pt-3 pb-6">
      <div className="px-5">
        <div>
          <TextHeading3>Complete your project:</TextHeading3>
        </div>
        <div className="flex flex-row items-end justify-between">
          <TextHeading3>
            Find members of Eden 🌱 Network for your project.
          </TextHeading3>
          <BatteryStepper size="sm" batteryPercentage={battery} />
        </div>
        <div>
          <div className="mb-3 mt-3">
            <div>
              <div className="mb-3">
                <div className="mt-3 w-4/6">
                  <br />
                  <div>
                    <p className="text-sm font-normal">
                      {`What role are you looking to fill`}
                    </p>
                  </div>
                  {/* <div className="w-2/4">
                    <RoleSelector
                      // value={currentUser?.memberRole?.title || ""}
                      roles={dataRoles?.findRoleTemplates}
                      // onSelect={(e) => setRole(e?._id as string)}
                    />
                  </div> */}
                  <div className="mb-3">
                    <TextField
                      // value={state.name}
                      placeholder="Start typing here..."
                      onChange={(e) => {
                        handleUpdateState(e.target.value, "name");
                        setBattery(battery < 20 ? battery + 10 : battery);
                        // setBattery(battery ? battery : 10 + 10);
                      }}
                    />
                  </div>
                </div>
                <div className="mt-3">
                  <div>
                    <p className="text-sm font-normal">
                      {`Select the Role: 🤖`}
                    </p>
                  </div>
                  <div className="flex w-full flex-wrap justify-center gap-1">
                    {!isEmpty(expertise) &&
                      map(expertise, (item: any, key: number) => (
                        <SelectBoxNode
                          multiple
                          key={key}
                          caption={item?.name}
                          items={item?.subNodes}
                          onChange={(val) => {
                            console.log("val", val);
                            setBattery(battery < 99 ? battery + 10 : battery);
                            // setSelectedItems((prevState) => ({
                            //   ...prevState,
                            //   [item?._id]: val,
                            // }));
                          }}
                        />
                      ))}
                  </div>
                </div>
                <div className="mt-3">
                  <div>
                    <p className="text-sm font-normal">
                      {`Write a short one-liner to explain the role:`}
                    </p>
                  </div>
                  <div>
                    <TextArea
                      onChange={(e) => {
                        handleUpdateState(e.target.value, "description");
                        setBattery(battery < 70 ? battery + 10 : battery);
                      }}
                      placeholder="Start typing here..."
                      rows={2}
                    />
                  </div>
                </div>

                <ToggleElement
                  isOptional
                  className="my-4"
                  title="Write a description of this role:"
                >
                  <TextArea
                    // value={state.description}
                    onChange={(e) => {
                      handleUpdateState(e.target.value, "description");
                    }}
                    rows={3}
                    placeholder="Start typing here..."
                  />
                </ToggleElement>
                <ToggleElement
                  isOptional
                  className="my-4"
                  title="What are the expectations for this role?"
                >
                  <TextArea
                    // value={state.description}
                    onChange={(e) => {
                      handleUpdateState(e.target.value, "description");
                    }}
                    rows={3}
                    placeholder="Start typing here..."
                  />
                </ToggleElement>
                <ToggleElement
                  isOptional
                  className="my-4"
                  title="What are the benfits of this role?"
                >
                  <TextArea
                    // value={state.benefits}
                    onChange={(e) => {
                      handleUpdateState(e.target.value, "benefits");
                    }}
                    placeholder="Start typing here..."
                    rows={3}
                  />
                </ToggleElement>
                <GridLayout className="bg-white">
                  <GridItemFour>
                    <p className="text-sm font-normal">
                      Availability:
                      <span className="text-xs text-gray-500"> (Optional)</span>
                    </p>
                    <div className="flex flex-row content-center items-center">
                      <div className="w-20">
                        <TextField
                          type="number"
                          // value={state.hrsWeek}
                          onChange={(e) => {
                            handleUpdateState(+e.target.value, "hrsWeek");
                          }}
                        />
                      </div>
                      <div className="ml-3 text-sm font-normal text-gray-400">{`hours / week`}</div>
                    </div>
                  </GridItemFour>
                  <GridItemFour>
                    <p className="text-sm font-normal">
                      Hourly rate:
                      <span className="text-xs text-gray-500"> (Optional)</span>
                    </p>
                    <div className="flex flex-row content-center items-center">
                      <div className="w-20">
                        <TextField
                          name="rate"
                          type="number"
                          // value={state.rate}
                          onChange={(e) => {
                            handleUpdateState(+e.target.value, "rate");
                          }}
                        />
                      </div>
                      <div className="ml-3 text-sm font-normal text-gray-400">{`$`}</div>
                    </div>
                  </GridItemFour>
                  <GridItemFour>
                    <p className="text-sm font-normal">
                      Open positions:
                      <span className="text-xs text-gray-500"> (Optional)</span>
                    </p>
                    <div className="flex flex-row content-center items-center">
                      <div className="w-20">
                        <TextField
                          name="positions"
                          type="number"
                          // value={state.positions}
                          onChange={(e) => {
                            handleUpdateState(+e.target.value, "description");
                          }}
                        />
                      </div>
                      <div className="ml-3 text-sm font-normal text-gray-400">{``}</div>
                    </div>
                  </GridItemFour>
                </GridLayout>
              </div>
            </div>
          </div>

          <div className="mt-3 flex justify-between">
            <Button variant="secondary" onClick={onBack}>
              Back
            </Button>
            <Button variant="secondary" onClick={() => onNext(state)}>
              Next
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};
