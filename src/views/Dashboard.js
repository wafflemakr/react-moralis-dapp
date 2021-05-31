import React, { useState, useEffect, useContext } from "react";
import {
  Container,
  Heading,
  Button,
  Box,
  Table,
  TableCaption,
  Tr,
  Th,
  Td,
  Tbody,
  Thead,
  Tfoot,
  Link,
  IconButton,
} from "@chakra-ui/react";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { useMoralisQuery, useMoralis } from "react-moralis";
import { Web3Context } from "../context";
import notify from "../utils/notify";

export default function Dashboard() {
  const { account } = useContext(Web3Context);
  const [limit, setLimit] = useState(100);
  const [tokenTransfers, setTokenTransfers] = useState([]);

  const { web3 } = useMoralis();

  const { data, error, isLoading } = useMoralisQuery(
    "PolygonTokenTransfers",
    (query) => query.limit(limit),
    [limit]
    // {
    //   live: "true",
    // }
  );

  const showMore = () => setLimit(limit + 10);

  const {
    data: tokenData,
    error: tokenError,
    isLoading: isDataLoading,
  } = useMoralisQuery(
    "PolygonTokenBalance",
    (query) => query.limit(20)
    // {
    //   live: "true",
    // }
  );

  useEffect(() => {
    if (error) notify("error", "Error", error.message);
    if (tokenError) notify("error", "Error", tokenError.message);
  }, [error, tokenError]);

  useEffect(() => {
    if (
      tokenTransfers.length === 0 &&
      account &&
      data.length > 0 &&
      !isDataLoading &&
      !isLoading
    ) {
      const symbols = {};
      tokenData.forEach((t) => {
        symbols[t.attributes.token_address] = t.attributes.symbol;
      });

      const _transfers = data
        .filter(
          ({ attributes: att }) =>
            att.from_address === account || att.to_address === account
        )
        .map(({ attributes: att }) => {
          return {
            token: att.token_address,
            symbol: symbols[att.token_address] || " - ",
            amount: Number(web3.utils.fromWei(att.value)).toPrecision(2),
            hash: att.transaction_hash,
            type:
              att.from_address.toLowerCase() === account.toLowerCase()
                ? "send"
                : "receive",
          };
        });
      setTokenTransfers(_transfers);
    }
  }, [
    data,
    tokenData,
    web3,
    isDataLoading,
    isLoading,
    account,
    tokenTransfers,
  ]);

  return (
    <Container maxW="xl" centerContent>
      <Heading>DASHBOARD PAGE</Heading>

      <Box mt={12}>
        {isLoading ? (
          "Loading..."
        ) : (
          <Table variant="simple" colorScheme="teal">
            <TableCaption>ERC20 token transactions</TableCaption>
            <Thead>
              <Tr>
                <Th textAlign="center">Type</Th>
                <Th textAlign="center">Token</Th>
                <Th>Amount</Th>
                <Th>Receipt</Th>
              </Tr>
            </Thead>
            <Tbody>
              {tokenTransfers.map((t, k) => (
                <Tr key={k}>
                  <Td textAlign="center">
                    <IconButton
                      colorScheme="teal"
                      size="lg"
                      icon={t.type === "send" ? <AddIcon /> : <MinusIcon />}
                      // variant="outline"
                      variant="ghost"
                    />
                  </Td>
                  <Td textAlign="center">{t.symbol}</Td>
                  <Td>{t.amount}</Td>
                  <Td>
                    <Link
                      href={`https://explorer-mainnet.maticvigil.com/tx/${t.hash}`}
                      isExternal
                    >
                      {t.hash.substring(0, 8) +
                        "..." +
                        t.hash.substring(58, 66)}
                    </Link>
                  </Td>
                </Tr>
              ))}
            </Tbody>
            <Tfoot>
              <Tr>
                <Th>Token Address</Th>
                <Th>Amount</Th>
                <Th>Receipt</Th>
              </Tr>
            </Tfoot>
          </Table>
        )}
        <Box mt={10} textAlign="center">
          <Button onClick={showMore}>Show more</Button>
        </Box>
      </Box>
    </Container>
  );
}
