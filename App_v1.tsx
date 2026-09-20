import {
  useMemo,
  useState,
} from "react";
import type {
  ChangeEvent,
} from "react";
import "./App.css";
import {
  binaryFeatures,
  consonantManners,
  consonantPlaces,
  sounds,
  unaryFeatures,
  vowelBacknesses,
  vowelHeights,
} from "./featureData";
import type {
  BinaryFeature,
  ConsonantManner,
  ConsonantPlace,
  FeatureValue,
  Sound,
  UnaryFeature,
  VowelBackness,
  VowelHeight,
} from "./featureData";

type BinarySelection =
  Partial<
    Record<
      BinaryFeature,
      FeatureValue
    >
  >;

function matchesSelection(
  sound: Sound,
  selectedNodes:
    readonly UnaryFeature[],
  binarySelection:
    BinarySelection,
): boolean {
  for (
    const node of
    selectedNodes
  ) {
    if (
      !sound.nodes.includes(
        node,
      )
    ) {
      return false;
    }
  }

  for (
    const [
      feature,
      value,
    ] of Object.entries(
      binarySelection,
    ) as [
      BinaryFeature,
      FeatureValue,
    ][]
  ) {
    if (
      sound.features[
        feature
      ] !== value
    ) {
      return false;
    }
  }

  return true;
}

function buildNotation(
  selectedNodes:
    readonly UnaryFeature[],
  binarySelection:
    BinarySelection,
): string {
  const binary =
    binaryFeatures
      .filter(
        (feature) =>
          binarySelection[
            feature
          ] !== undefined,
      )
      .map(
        (feature) =>
          `${binarySelection[feature]}${feature}`,
      );

  return [
    ...selectedNodes,
    ...binary,
  ].join(", ");
}

function getSoundTitle(
  sound: Sound,
): string {
  const featureLines =
    binaryFeatures
      .filter(
        (feature) =>
          sound.features[
            feature
          ] !== undefined,
      )
      .map(
        (feature) =>
          `${sound.features[feature]}${feature}`,
      );

  return [
    sound.nodes.join(", "),
    ...featureLines,
  ]
    .filter(Boolean)
    .join(" · ");
}

function App() {
  const [
    selectedNodes,
    setSelectedNodes,
  ] = useState<
    UnaryFeature[]
  >([]);

  const [
    binarySelection,
    setBinarySelection,
  ] =
    useState<BinarySelection>(
      {},
    );

  const [
    hideEliminated,
    setHideEliminated,
  ] = useState(false);

  const remaining =
    useMemo(
      () =>
        sounds.filter(
          (sound) =>
            matchesSelection(
              sound,
              selectedNodes,
              binarySelection,
            ),
        ),
      [
        selectedNodes,
        binarySelection,
      ],
    );

  const remainingSymbols =
    new Set(
      remaining.map(
        (sound) =>
          sound.symbol,
      ),
    );

  const notation =
    buildNotation(
      selectedNodes,
      binarySelection,
    );

  const hasFilters =
    selectedNodes.length > 0 ||
    Object.keys(
      binarySelection,
    ).length > 0;

  function toggleNode(
    node: UnaryFeature,
  ) {
    setSelectedNodes(
      (previous) =>
        previous.includes(node)
          ? previous.filter(
              (item) =>
                item !== node,
            )
          : [
              ...previous,
              node,
            ],
    );
  }

  function chooseBinary(
    feature:
      BinaryFeature,
    value:
      FeatureValue,
  ) {
    setBinarySelection(
      (previous) => {
        if (
          previous[
            feature
          ] === value
        ) {
          const next = {
            ...previous,
          };

          delete next[
            feature
          ];

          return next;
        }

        return {
          ...previous,
          [feature]: value,
        };
      },
    );
  }

  function resetFilters() {
    setSelectedNodes([]);
    setBinarySelection({});
  }

  function renderSound(
    sound: Sound,
  ) {
    const remains =
      remainingSymbols.has(
        sound.symbol,
      );

    if (
      hideEliminated &&
      !remains
    ) {
      return null;
    }

    return (
      <button
        type="button"
        className={`ipa-symbol ${
          remains
            ? "remaining"
            : "eliminated"
        }`}
        title={
          getSoundTitle(
            sound,
          )
        }
        key={
          sound.symbol
        }
      >
        /{sound.symbol}/
      </button>
    );
  }

  function consonantsFor(
    manner:
      ConsonantManner,
    place:
      ConsonantPlace,
  ) {
    return sounds
      .filter(
        (sound) =>
          sound.category ===
            "consonant" &&
          sound.consonant
            ?.manner ===
            manner &&
          sound.consonant
            ?.place ===
            place,
      )
      .sort(
        (a, b) => {
          const order = {
            voiceless: 0,
            single: 1,
            voiced: 2,
          };

          return (
            order[
              a.consonant!
                .voiceOrder
            ] -
            order[
              b.consonant!
                .voiceOrder
            ]
          );
        },
      );
  }

  function vowelsFor(
    height:
      VowelHeight,
    backness:
      VowelBackness,
  ) {
    return sounds
      .filter(
        (sound) =>
          sound.category ===
            "vowel" &&
          sound.vowel
            ?.height ===
            height &&
          sound.vowel
            ?.backness ===
            backness,
      )
      .sort(
        (a, b) =>
          (
            a.vowel?.order ??
            0
          ) -
          (
            b.vowel?.order ??
            0
          ),
      );
  }

  return (
    <div className="page-shell">
      <aside className="feature-sidebar">
        <div className="sidebar-heading">
          <p className="eyebrow">
            Natural class filters
          </p>

          <h2>
            Select features
          </h2>

          <p>
            Unary place nodes are
            either selected or not
            selected. Every other
            feature uses + or −.
          </p>
        </div>

        <button
          type="button"
          className="reset-button"
          onClick={
            resetFilters
          }
        >
          Clear all features
        </button>

        <section className="feature-section">
          <div className="feature-section-heading">
            <div>
              <span className="section-number">
                01
              </span>

              <h3>
                Unary nodes
              </h3>
            </div>

            <small>
              No + / − value
            </small>
          </div>

          <div className="unary-list">
            {unaryFeatures.map(
              (node) => {
                const selected =
                  selectedNodes.includes(
                    node,
                  );

                return (
                  <button
                    type="button"
                    aria-pressed={
                      selected
                    }
                    className={`unary-button ${
                      selected
                        ? "selected"
                        : ""
                    }`}
                    key={node}
                    onClick={() =>
                      toggleNode(
                        node,
                      )
                    }
                  >
                    <span className="node-check">
                      {selected
                        ? "✓"
                        : ""}
                    </span>

                    <span>
                      [{node}]
                    </span>
                  </button>
                );
              },
            )}
          </div>
        </section>

        <section className="feature-section">
          <div className="feature-section-heading">
            <div>
              <span className="section-number">
                02
              </span>

              <h3>
                Binary features
              </h3>
            </div>

            <small>
              Choose + or −
            </small>
          </div>

          <div className="binary-list">
            {binaryFeatures.map(
              (feature) => {
                const selected =
                  binarySelection[
                    feature
                  ];

                return (
                  <div
                    className="binary-row"
                    key={feature}
                  >
                    <span className="binary-label">
                      [±{feature}]
                    </span>

                    <div className="binary-buttons">
                      <button
                        type="button"
                        aria-pressed={
                          selected ===
                          "+"
                        }
                        className={
                          selected ===
                          "+"
                            ? "positive selected"
                            : "positive"
                        }
                        onClick={() =>
                          chooseBinary(
                            feature,
                            "+",
                          )
                        }
                      >
                        +
                      </button>

                      <button
                        type="button"
                        aria-pressed={
                          selected ===
                          "-"
                        }
                        className={
                          selected ===
                          "-"
                            ? "negative selected"
                            : "negative"
                        }
                        onClick={() =>
                          chooseBinary(
                            feature,
                            "-",
                          )
                        }
                      >
                        −
                      </button>
                    </div>
                  </div>
                );
              },
            )}
          </div>
        </section>
      </aside>

      <main className="app">
        <header className="app-header">
          <div>
            <p className="eyebrow">
              LING 220 phonology
            </p>

            <h1>
              IPA Natural Class
              Builder
            </h1>

            <p>
              Start with the entire
              course IPA inventory.
              Each selected feature
              removes sounds that do
              not match the feature
              bundle.
            </p>
          </div>

          <div className="count-card">
            <span>
              Remaining
            </span>

            <strong>
              {
                remaining.length
              }
              <small>
                /{sounds.length}
              </small>
            </strong>
          </div>
        </header>

        <section className="class-summary">
          <div>
            <p className="summary-label">
              Current feature bundle
            </p>

            <p className="feature-notation">
              {hasFilters
                ? `[${notation}]`
                : "No features selected"}
            </p>
          </div>

          <div className="class-result">
            <span>
              Natural class
            </span>

            <strong>
              {remaining.length > 0
                ? `{ ${remaining
                    .map(
                      (sound) =>
                        `/${sound.symbol}/`,
                    )
                    .join(", ")} }`
                : "∅"}
            </strong>
          </div>

          <label className="hide-toggle">
            <input
              type="checkbox"
              checked={
                hideEliminated
              }
              onChange={(
                event:
                  ChangeEvent<HTMLInputElement>,
              ) =>
                setHideEliminated(
                  event.target
                    .checked,
                )
              }
            />

            <span className="toggle-control" />

            <span>
              Hide eliminated sounds
            </span>
          </label>
        </section>

        {remaining.length ===
          0 && (
          <div className="empty-class-warning">
            No sound in this
            feature chart matches
            the current feature
            bundle.
          </div>
        )}

        <section className="chart-panel">
          <div className="chart-heading">
            <div>
              <p className="section-kicker">
                Consonants
              </p>

              <h2>
                Consonant chart
              </h2>
            </div>

            <p>
              Voiceless members are
              shown before voiced
              members where a pair
              is present.
            </p>
          </div>

          <div className="consonant-scroll">
            <div className="consonant-chart">
              <div className="corner-cell">
                Manner
              </div>

              {consonantPlaces.map(
                (place) => (
                  <div
                    className="place-heading"
                    key={place}
                  >
                    {place}
                  </div>
                ),
              )}

              {consonantManners.flatMap(
                (manner) => [
                  <div
                    className="manner-heading"
                    key={`${manner}-heading`}
                  >
                    {manner}
                  </div>,
                  ...consonantPlaces.map(
                    (place) => {
                      const cellSounds =
                        consonantsFor(
                          manner,
                          place,
                        );

                      return (
                        <div
                          className="ipa-cell"
                          key={`${manner}-${place}`}
                        >
                          {cellSounds.map(
                            (
                              sound,
                            ) =>
                              renderSound(
                                sound,
                              ),
                          )}
                        </div>
                      );
                    },
                  ),
                ],
              )}
            </div>
          </div>
        </section>

        <section className="chart-panel vowel-panel">
          <div className="chart-heading">
            <div>
              <p className="section-kicker">
                Vowels
              </p>

              <h2>
                Vowel chart
              </h2>
            </div>

            <p>
              Placement follows the
              front / central / back
              and high / mid / low
              distinctions encoded
              in the course feature
              chart.
            </p>
          </div>

          <div className="vowel-chart">
            <div className="vowel-corner" />

            {vowelBacknesses.map(
              (backness) => (
                <div
                  className="vowel-heading"
                  key={backness}
                >
                  {backness}
                </div>
              ),
            )}

            {vowelHeights.flatMap(
              (height) => [
                <div
                  className="vowel-height"
                  key={`${height}-heading`}
                >
                  {height}
                </div>,
                ...vowelBacknesses.map(
                  (backness) => (
                    <div
                      className={`vowel-cell vowel-${height.toLowerCase()} vowel-${backness.toLowerCase()}`}
                      key={`${height}-${backness}`}
                    >
                      {vowelsFor(
                        height,
                        backness,
                      ).map(
                        (sound) =>
                          renderSound(
                            sound,
                          ),
                      )}
                    </div>
                  ),
                ),
              ],
            )}
          </div>
        </section>

        <section className="reading-note">
          <h2>
            How the filtering works
          </h2>

          <p>
            A sound remains only when
            it matches every selected
            feature. If the course
            chart does not specify a
            value for a selected
            binary feature, that sound
            is excluded. Selecting a
            unary node requires that
            node to be present.
          </p>
        </section>
      </main>
    </div>
  );
}

export default App;
